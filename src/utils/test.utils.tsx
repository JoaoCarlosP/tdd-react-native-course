import React from "react";
import { RenderOptions, render } from "@testing-library/react-native";
import rootReducer from "../store/reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";

const store = createStore(rootReducer)

type CustomRenderOptions = {
  store?: typeof store
}

const AllTheProviders = (options: CustomRenderOptions) => ({
  children
}: {
  children: React.ReactNode
}) => {
  return <Provider store={options.store || store}>{children}</Provider>
}

const customRender = (
  ui: React.ReactElement,
  options: CustomRenderOptions & Omit<RenderOptions, 'queries'> = {}
) => {
  const { store, ...others} = options

  return render(ui, { wrapper: AllTheProviders({ store }) as React.ComponentType, ...others })
}

export * from '@testing-library/react-native'
export { customRender as render}