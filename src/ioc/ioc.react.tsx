import React, { useContext } from "react";
import { Container, interfaces } from "inversify";
import { useMemoOne } from "use-memo-one";

const InversifyContext = React.createContext<{ container: Container | null }>({ container: null });

type Props = {
    container: Container;
};

export const IoCProvider: React.FC<Props> = ({ container, children }) => {
    return (
        <InversifyContext.Provider value={{ container: container }}>
            {children}
        </InversifyContext.Provider>
    );
};

export const useInjection = <T, >(identifier: interfaces.ServiceIdentifier<T>) => {
    const { container } = useContext(InversifyContext);
    if (!container) {
      throw new Error();
    }
    return useMemoOne(() => container.get<T>(identifier), [container, identifier]);
};