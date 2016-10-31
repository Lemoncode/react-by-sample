import * as React from "react"

interface Props {
   children? : any;
}

export const CenteredContainer = (props: Props) => {
  return (    
      <div className="container">
          <div className="row">
              <div className="col-md-4 col-md-offset-4">
                  <div className="panel panel-default">
                        {props.children}
                  </div>
              </div>
          </div>
      </div>
  );
}