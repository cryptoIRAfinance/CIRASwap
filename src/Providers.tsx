import React from "react";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { NetworkContextName } from "./constants";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeEditorProvider, HyperThemeEditor } from "@hypertheme-editor-pro/chakra-ui";
import theme from "./theme";
import store from "./state";
import getLibrary from "./utils/getLibrary";



const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <ChakraProvider theme={theme}>
				<ThemeEditorProvider>
        <HyperThemeEditor pos="fixed" bottom={4} right={2} />
		{children}
				</ThemeEditorProvider>
            </ChakraProvider>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
};

export default Providers;
