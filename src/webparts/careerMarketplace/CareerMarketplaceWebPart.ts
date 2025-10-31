/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'CareerMarketplaceWebPartStrings';
import CareerMarketplace from './components/CareerMarketplace';
import { ICareerMarketplaceProps } from './components/ICareerMarketplaceProps';
import { getSP } from '../../pnpConfig';
import GraphService from '../../services/GraphService';
import { createOpportunityConfig, getJobOpportunityUrl } from '../../servicesConfig';
import { ITerm} from '@pnp/graph/taxonomy';
import { graphfi, SPFx } from '@pnp/graph';
import { IColumnReturnProperty, IPropertyFieldRenderOption, PropertyFieldColumnPicker, PropertyFieldColumnPickerOrderBy, PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls';

 

export interface ICareerMarketplaceWebPartProps {
  prefLang: string;
  context: WebPartContext;
  userDisplayName: string;
  workEmail: string;
  url: string;
  edit: boolean;
  jobOppOwner: string | undefined;
  clientId: string,
  jobTypeDeploymentTerms: any[],
  list: string;
  multiColumn: string;
}

export interface IPropertyControlsTestWebPartProps {
  lists: string | string[]; // Stores the list ID(s)
}

export default class CareerMarketplaceWebPart extends BaseClientSideWebPart<ICareerMarketplaceWebPartProps> {

  private jobOpportunityId: string | null = null;
  private jobOpportunityOwner: string | undefined = undefined ; 
  private jobTypeDeploymentTerms: any[] = [];


  public render(): void {


    const element: React.ReactElement<ICareerMarketplaceProps> = React.createElement(
      CareerMarketplace,
      {
        prefLang: this.properties.prefLang,
        context: this.context,
        userDisplayName: this.context.pageContext.user.displayName,
        workEmail: this.context.pageContext.user.email,
        url: this.context.pageContext.site.absoluteUrl,
        edit: this.properties.edit,
        jobOpportunityId: this.jobOpportunityId || '',
        jobOppOwner: this.jobOpportunityOwner,
        clientId: createOpportunityConfig.clientId,
        createJobApiUrl: createOpportunityConfig.createJobApiUrl,
        editJobApiUrl: createOpportunityConfig.editJobApiUrl,
        jobTypeTermId: createOpportunityConfig.jobTypeTermId,
        programAreaTermId: createOpportunityConfig.programAreaTermId,
        jobOpportunityListUrl: `${getJobOpportunityUrl(this.jobOpportunityId)}`,
        jobTypeDeploymentTerms: this.jobTypeDeploymentTerms,
        list: this.properties.list,
        multiColumn: this.properties.multiColumn,
    
      }
    );

    ReactDom.render(element, this.domElement);
  }


  protected async onInit(): Promise<void> {
   

    const sp = getSP(this.context);

    GraphService.setup(this.context);
    this._getJobTypeTerms();

 
    this.jobOpportunityId = this.getQueryParam('JobOpportunityId');
   
    try {
      if (this.jobOpportunityId !== null ) {
        const jobOppList = await sp.web.lists.getByTitle("JobOpportunity").items.getById(Number(this.jobOpportunityId)).select('ContactEmail')();
        this.jobOpportunityOwner = jobOppList.ContactEmail
      }
    } catch (error){
      console.error("Error fetching list", error);
    }

     await super.onInit();
  
  }

  private  async _getJobTypeTerms(): Promise<void> {
    const graph = graphfi().using(SPFx(this.context));
    const jobTypeItems:any[]=[];

    try { 

      //Id of term set "Job Type"
        const jobTypeTermSet: ITerm[] = await graph.termStore.sets.getById(createOpportunityConfig.jobTypeTermId).terms();

        jobTypeTermSet.map((term:any) => {
          jobTypeItems.push({id: term.id, labels: term.labels})
        });

        //Filtered Id of term "Deployment - permanent" and "Mutation – permanente"
        jobTypeItems.filter(item => item.id === createOpportunityConfig.jobTypeDeploymentId).map(filteredItem => {
          this.jobTypeDeploymentTerms.push(filteredItem);
        });

        
      } catch (error) {
        console.error("ERROR-" + error);
      }
      
  }
  


  private getQueryParam(param: string): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);  
  }
  

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }




  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('prefLang', {
                  label: 'Preferred Language',
                  options: [
                    { key: 'account', text: 'Account' },
                    { key: 'en-us', text: 'English' },
                    { key: 'fr-fr', text: 'Français' }
                  ]
                }),
                PropertyPaneToggle('edit', {
                  key: 'EditToggle',
                  label: 'Edit Opportunity',
                  onText: 'Yes',
                  offText: 'No'
                }),
                PropertyFieldListPicker('list', {
                  label: 'Select list for Editing Job Opportunities',
                  selectedList: this.properties.list,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context as any,
                  onGetErrorMessage: undefined,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId',
                  filter: "Hidden eq false and BaseType eq 0"
                }),
                  PropertyFieldColumnPicker('multiColumn', {
                    label: 'Select columns',
                    context: this.context as any,
                    selectedColumn: this.properties.multiColumn,
                    listId: this.properties.list,
                    disabled: false,
                    orderBy: PropertyFieldColumnPickerOrderBy.Title,
                    onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                    properties: this.properties,
                    onGetErrorMessage: undefined,
                    deferredValidationTime: 0,
                    key: 'multiColumnPickerFieldId',
                    displayHiddenColumns: false,
                    columnReturnProperty: IColumnReturnProperty['Internal Name'],
                    multiSelect: true,
                    renderFieldAs: IPropertyFieldRenderOption["Multiselect Dropdown"]
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}


