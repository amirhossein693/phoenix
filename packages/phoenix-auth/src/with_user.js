import React, { useState } from "react";
import UserContext from "./user_context";

const withUser = (Component, { user, theUser }) => {
  return props => {
    const [userData, setUserData] = useState(user);
    const [userContextData, setUserContextData] = useState(theUser);
    return (
      <UserContext.Provider
        value={{
          context: userContextData,
          user: userData,
          updateUser: (data, context) => {
            setUserData(data);
            setUserContextData(context);
          }
        }}
      >
        <Component {...props} />
      </UserContext.Provider>
    );
  };
};

export default withUser;
