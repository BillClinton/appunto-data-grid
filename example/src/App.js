import React from 'react'
import {
  ThemeProvider,
  CSSReset,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/core'
import RemoteStoreProvider from './remote/RemoteStore'
import LocalGrid from './LocalGrid'
import RemoteGrid from './remote/RemoteGrid'
import { GridContextProvider } from 'appunto-data-grid'

export default function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <div className='App'>
        <Tabs defaultIndex={1}>
          <TabList>
            <Tab>Local Grid</Tab>
            <Tab>Remote Data Grid</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <GridContextProvider>
                <LocalGrid />
              </GridContextProvider>
            </TabPanel>
            <TabPanel>
              <RemoteStoreProvider>
                <GridContextProvider>
                  <RemoteGrid />
                </GridContextProvider>
              </RemoteStoreProvider>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </ThemeProvider>
  )
}
