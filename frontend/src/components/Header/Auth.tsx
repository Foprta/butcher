import React, { useContext, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Button, message, Tag, Tooltip } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { UserStoreContext } from "../../stores";
import { observer } from "mobx-react";

export const Auth: React.FC = observer(() => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const userStore = useContext(UserStoreContext);

  useEffect(
    () =>
      userStore.setAddress(
        isAuthenticated && user
          ? utils.getAddress(user.attributes.ethAddress)
          : undefined
      ),
    [isAuthenticated, user]
  );

  return (
    <div className="space-x-4">
      {userStore.address ? (
        <>
          <Tooltip title="Copy Address">
            <Tag
              className="cursor-pointer"
              icon={<CheckCircleOutlined />}
              color="success"
              onClick={() => {
                navigator.clipboard
                  .writeText(userStore.address!)
                  .then(() => message.success("Address copied!"));
              }}
            >
              {userStore.address?.slice(0, 8)}...
              {userStore.address?.slice(-6)}
            </Tag>
          </Tooltip>
          <Button type="primary" danger ghost onClick={() => logout()}>
            Logout
          </Button>
        </>
      ) : (
        <Button type="primary" onClick={() => authenticate()}>
          Login
        </Button>
      )}
    </div>
  );
});
