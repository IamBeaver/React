import React from "react";
import { List } from "@mui/material";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useInjection } from "../../ioc/ioc.react";
import ownTypes from "../../ioc/ownTypes";
import UsersListStore from "../../stores/UsersListStore";
import UsersListItem from "../UsersListItem"

const UsersList = observer(() => {
    const store = useInjection<UsersListStore>(ownTypes.usersListStore);

    useEffect(() => {
        const init = async() => {
            await store.init();
        }
        init();
    }, [store])

    return (
        <List>
            { store.users.map((user, key) => (
                <UsersListItem
                    key={key}
                    id={user.id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    age={user.age}
                />
            ))}
        </List>
    );
})

export default UsersList;