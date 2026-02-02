/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from 'primereact/editor';
import { Label,  Stack, StackItem } from '@fluentui/react';
import * as React from 'react';
import styles from './CareerMarketplace.module.scss';

export interface IRichTextEditorProps {
  id: string;
  name: string;
  title: string;
  onChange?: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  defaultValue?: string;
  readOnly?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  validateonLoad?: boolean;
  validateOnFocusOut?: boolean;
  onGetErrorMessage?:(value: string | number) => string | JSX.Element | undefined;
  onBlur?: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  ariaLabelRequired: string;
  ariaInvalid?: boolean;
  maxLength?: number;
  instruction?: string;
  placeholder?: string;
}


export default class RichTextEditor extends React.Component<IRichTextEditorProps> {

    private lastValue: string = '';

    private createFormEvent(name: string, value: string): React.FormEvent<HTMLInputElement | HTMLTextAreaElement> {
        return { target: { name, value } as HTMLInputElement } as unknown as React.FormEvent<HTMLInputElement>;
    }

    private handleChange = (e: any): void => {
        const html = e.htmlValue ?? '';
        this.lastValue = html; // store latest value

        const formEvent = this.createFormEvent(this.props.name, html);
        this.props.onChange?.(formEvent, html);
    };

    private handleBlur = (): void => {
        const formEvent = this.createFormEvent(this.props.name, this.lastValue);
        this.props.onBlur?.(formEvent, this.lastValue);
    };

    public render(): React.ReactElement<IRichTextEditorProps> {

        const headerTemplate = (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold" />
                <button className="ql-italic" aria-label="Italic" />
                <button className="ql-list" value="ordered" aria-label="Ordered List" />
                <button className="ql-list" value="bullet" aria-label="Bullet List" />
            </span>
        );

        return (
            <div>
                <Stack  horizontal verticalAlign="center" >
                    <StackItem>
                        <Label id={`${this.props.id}-label`}>
                        <p className={styles.mrg0}>
                            <span  aria-hidden="true" style={{color: 'rgb(164, 38, 44)'}} >
                            *
                            </span>
                            <span className={styles.visuallyHidden}>{this.props.ariaLabelRequired}</span>
                            {this.props.title}
                        </p>
                        <p className={styles.instruction}>{this.props.instruction}</p>
                        </Label>
                    </StackItem>
                </Stack>
                <Editor 
                    headerTemplate={headerTemplate}
                    defaultValue={this.props.defaultValue}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    disabled={this.props.disabled} 
                    readOnly={this.props.readOnly}
                    formats={['bold','italic','list','indent']}
                    style={{ height: '150px' }} 
                />
            </div>
        
        )
    }
}