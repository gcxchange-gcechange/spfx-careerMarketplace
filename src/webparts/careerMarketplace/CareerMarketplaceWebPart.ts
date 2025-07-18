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

 
 

export interface ICareerMarketplaceWebPartProps {
  prefLang: string;
  context: WebPartContext;
  userDisplayName: string;
  workEmail: string;
  url: string;
  edit: boolean;
  jobOppOwner: string | undefined;
  clientId: string,
}

export default class CareerMarketplaceWebPart extends BaseClientSideWebPart<ICareerMarketplaceWebPartProps> {

  private jobOpportunityId: string | null = null;
  private jobOpportunityOwner: string | undefined = undefined ; 

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
        jobOpportunityListUrl: `${getJobOpportunityUrl(this.jobOpportunityId)}`
    
      }
    );

    ReactDom.render(element, this.domElement);
  }


  protected async onInit(): Promise<void> {

    const sp = getSP(this.context);

    GraphService.setup(this.context);
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}


