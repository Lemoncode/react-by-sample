import * as React from "react"

interface Props {
   text : string;
   name : string;
   type : string;
   value?: string;
   updateFieldValue : (fieldName: string, fieldValue: any) => void;
}

export const FormField = (props: Props) => {


  return (
      <div className="form-group">
          <input className="form-control" 
                placeholder={props.text} 
                name={props.name} 
                type={props.type}
                value={props.value}
                onChange={(e: any) => props.updateFieldValue(props.name, e.target.value)}
              />
      </div>
  );
}
