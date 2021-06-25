import React, { useEffect, useState } from "react";

const asyncComponent = (importedComponent) => {
    return (props) =>  {
        const [component, setComponent] = useState(null);

        useEffect(() => {
            importedComponent().then(cmp => {
                setComponent(cmp.default);
            });
        }, []);

        
        let C = component;
        return C ? <C {...props}/> : null;
    }
};

export default asyncComponent;