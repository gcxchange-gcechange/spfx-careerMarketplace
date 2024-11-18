/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'CareerMarketplaceWebPartStrings';
import CareerMarketplace from './components/CareerMarketplace';
import { ICareerMarketplaceProps } from './components/ICareerMarketplaceProps';
import { getSP } from '../../pnpConfig';
 
 

export interface ICareerMarketplaceWebPartProps {
  description: string;
  context: WebPartContext;
  userDisplayName: string;
  workEmail: string;
}

export default class CareerMarketplaceWebPart extends BaseClientSideWebPart<ICareerMarketplaceWebPartProps> {


  public render(): void {
    const element: React.ReactElement<ICareerMarketplaceProps> = React.createElement(
      CareerMarketplace,
      {
        description: this.properties.description,
        context: this.context,
        userDisplayName: this.context.pageContext.user.displayName,
        workEmail: this.context.pageContext.user.email
        
      }
    );

    ReactDom.render(element, this.domElement);
  }

  // protected onInit(): Promise<void> {
  //   return Promise.resolve();
  // }

  protected async onInit(): Promise<void> {

    await super.onInit();

    getSP(this.context);
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}


