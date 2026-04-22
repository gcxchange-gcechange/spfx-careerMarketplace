/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'CareerMarketplaceWebPartStrings';
import CareerMarketplace from './components/CareerMarketplace';
import { ICareerMarketplaceProps } from './components/ICareerMarketplaceProps';
import { getSP } from '../../pnpConfig';
import GraphService from '../../services/GraphService';
import { createOpportunityConfig, getJobOpportunityUrl } from '../../servicesConfig';
import { ITerm } from '@pnp/graph/taxonomy';
import { graphfi, SPFx } from '@pnp/graph';
 

export interface ICareerMarketplaceWebPartProps {
  prefLang: string,
  context: WebPartContext,
  userDisplayName: string,
  workEmail: string,
  url: string,
  jobOppOwner: string | undefined,
  environment: string,
  // clientId: string,
  // createJobApiUrl: string,
  // editJobApiUrl: string,
  // jobTypeTermId: string,
  // programAreaTermId: string,

  devClientId: string,
  devCreateJobApiUrl: string,
  devEditJobApiUrl: string,
  devJobTypeTermId: string,
  devProgramAreaTermId: string,

  uatClientId: string,
  uatCreateJobApiUrl: string,
  uatEditJobApiUrl: string,
  uatJobTypeTermId: string,
  uatProgramAreaTermId: string,

  prodClientId: string,
  prodCreateJobApiUrl: string,
  prodEditJobApiUrl: string,
  prodJobTypeTermId: string,
  prodProgramAreaTermId: string,

  jobOpportunityListUrl: string,
  jobTypeDeploymentId: string,
  jobTypeDeploymentTerms: any[],
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
        jobOpportunityId: this.jobOpportunityId || '',
        jobOppOwner: this.jobOpportunityOwner,
        environment: this.properties.environment,

        devClientId: this.properties.devClientId,
        devCreateJobApiUrl: this.properties.devCreateJobApiUrl,
        devEditJobApiUrl: this.properties.devEditJobApiUrl,
        devJobTypeTermId: this.properties.devJobTypeTermId,
        devProgramAreaTermId: this.properties.devProgramAreaTermId,

        uatClientId: this.properties.uatClientId,
        uatCreateJobApiUrl: this.properties.uatCreateJobApiUrl,
        uatEditJobApiUrl: this.properties.uatEditJobApiUrl,
        uatJobTypeTermId: this.properties.uatJobTypeTermId,
        uatProgramAreaTermId: this.properties.uatProgramAreaTermId,

        prodClientId: this.properties.prodClientId,
        prodCreateJobApiUrl: this.properties.prodCreateJobApiUrl,
        prodEditJobApiUrl: this.properties.prodEditJobApiUrl,
        prodJobTypeTermId: this.properties.prodJobTypeTermId,
        prodProgramAreaTermId: this.properties.prodProgramAreaTermId,

        jobOpportunityListUrl: `${getJobOpportunityUrl(this.jobOpportunityId)}`,
        jobTypeDeploymentTerms: this.jobTypeDeploymentTerms,
        jobTypeDeploymentId: this.properties.jobTypeDeploymentId,
    
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

   protected onPropertyPaneFieldChanged(propertyPath: string): void {
    console.log(`Property pane field changed: ${propertyPath}`);
    if (propertyPath === 'environment') {
      this.context.propertyPane.refresh();
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    const isDEV = this.properties.environment === 'dev';
    const isUAT = this.properties.environment === 'uat';
    const isPROD = this.properties.environment === 'prod';

    return {
        pages: [
          {
            displayGroupsAsAccordion: true,
            header: {
              description: strings.PropertyPaneDescription
            },
            groups: [
              {
                groupName: 'Language Settings',
                isCollapsed:true,
                groupFields: [
                  PropertyPaneDropdown('prefLang', {
                    label: 'Preferred Language',
                    options: [
                      { key: 'account', text: 'Account' },
                      { key: 'en-us', text: 'English' },
                      { key: 'fr-fr', text: 'Français' }
                    ]
                  })
                ]
              },
               {
              groupName: "Environment Settings",
                groupFields: [
                  PropertyPaneChoiceGroup('environment', {
                    label: 'Environment Configuration',
                    options: [
                      { key: 'dev', text: 'Development' },
                      { key: 'uat', text: 'UAT' },
                      { key: 'prod', text: 'Production' },
                    ]
                  })
                ]
            },
            ...(isDEV ? [
              {
                groupName: 'DEV Settings',
                isCollapsed:true,
                groupFields: [
                  PropertyPaneTextField('devClientId', {
                    label: 'Client ID',
                    description: 'The ID of the client.'
                  }),
                  PropertyPaneTextField('devCreateJobApiUrl', {
                    label: 'Create Job API URL',
                    description: 'The URL of the create job API.'
                  }),
                  PropertyPaneTextField('devEditJobApiUrl', {
                    label: 'Edit Job API URL',
                    description: 'The URL of the edit job API.'
                  }),
                  PropertyPaneTextField('devJobTypeTermId', {
                    label: 'Job Type Term ID',
                    description: 'The ID of the job type term set.'
                  }),
                  PropertyPaneTextField('devJobTypeDeploymentId', {
                    label: 'Job Type Deployment ID',
                    description: 'The ID of the job type deployment term.'
                  }),
                   PropertyPaneTextField('devProgramAreaTermId', {
                    label: 'Program Area Term ID',
                    description: 'The ID of the program area term set.'
                  }),
                ]
              }] : []),

              ...(isUAT ? [
              {
                groupName: 'UAT Settings',
                isCollapsed:true,
                groupFields: [
                   PropertyPaneTextField('uatClientId', {
                    label: 'Client ID',
                    description: 'The ID of the client.'
                  }),
                  PropertyPaneTextField('uatCreateJobApiUrl', {
                    label: 'Create Job API URL',
                    description: 'The URL of the create job API.'
                  }),
                  PropertyPaneTextField('uatEditJobApiUrl', {
                    label: 'Edit Job API URL',
                    description: 'The URL of the edit job API.'
                  }),
                  PropertyPaneTextField('uatJobTypeTermId', {
                    label: 'Job Type Term ID',
                    description: 'The ID of the job type term set.'
                  }),
                  PropertyPaneTextField('uatJobTypeDeploymentId', {
                    label: 'Job Type Deployment ID',
                    description: 'The ID of the job type deployment term.'
                  }),
                   PropertyPaneTextField('uatProgramAreaTermId', {
                    label: 'Program Area Term ID',
                    description: 'The ID of the program area term set.'
                  }),
                ]
              }]: []),

              ...(isPROD ? [
              {
                groupName: 'PROD Settings',
                isCollapsed:true,
                groupFields: [
                  PropertyPaneTextField('prodClientId', {
                    label: 'Client ID',
                    description: 'The ID of the client.'
                  }),
                  PropertyPaneTextField('prodCreateJobApiUrl', {
                    label: 'Create Job API URL',
                    description: 'The URL of the create job API.'
                  }),
                  PropertyPaneTextField('prodEditJobApiUrl', {
                    label: 'Edit Job API URL',
                    description: 'The URL of the edit job API.'
                  }),
                  PropertyPaneTextField('prodJobTypeTermId', {
                    label: 'Job Type Term ID',
                    description: 'The ID of the job type term set.'
                  }),
                  PropertyPaneTextField('prodJobTypeDeploymentId', {
                    label: 'Job Type Deployment ID',
                    description: 'The ID of the job type deployment term.'
                  }),
                   PropertyPaneTextField('prodProgramAreaTermId', {
                    label: 'Program Area Term ID',
                    description: 'The ID of the program area term set.'
                  }),
                ]
              }]: [])
            ]
          }
        ]
    };
  }
}


