import * as React from "react";
import {ErrorBoundary} from '../../../utils/error-boundaries'
interface Props {
  name: string;
  label: string;
  onChange: any;
  onBlur?: any;
  placeholder?: string;
  value: string;
  error?: string;
  type? : string;
}

const defaultProps : Partial<Props> = {
  type: 'text'
}

const buildWrapperClass = (error : string) : string => 
  "form-group" + (
      (error && error.length > 0) ? 
        "has-error" : 
        ""
      );


export const Input : React.StatelessComponent<Props> = (props) => 
      <ErrorBoundary>
      <div className={buildWrapperClass(props.error)}>      
        <label htmlFor={props.name}>{props.label}</label>
        <div className="field">
          <input type= {props.type}
              name={props.name}
              className="form-control"
              placeholder={props.placeholder}
              value={props.value}
              onChange={props.onChange}
              onBlur={props.onBlur}
            />
            <div className="input">{props.error}</div>        
        </div>
      </div>
      </ErrorBoundary>

Input.defaultProps = defaultProps;

