import React from "react";
import {useSession} from "../../contexts/SessionContext";
import {Route, Redirect} from "react-router-dom";
import {RouteProps} from "react-router";

export default function PrivateRoute({children, ...rest}: RouteProps) {
    const session = useSession();
    return (<Route {...rest} render={({location}) => {
        if (!session) {
            return (
                <Redirect
                    to={{
                        pathname: `/login`,
                        state: {from: location}
                    }}
                />
            );
        }

        return children;
    }}/>);

}
