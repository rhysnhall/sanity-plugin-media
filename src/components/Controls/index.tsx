import {Box, Flex} from '@sanity/ui'
import React, {FC} from 'react'

import useTypedSelector from '../../hooks/useTypedSelector'
import ButtonViewGroup from '../ButtonViewGroup'
import SearchFacets from '../SearchFacets'
import OrderSelect from '../OrderSelect'
import Progress from '../Progress'
import TextInputSearch from '../TextInputSearch'

const Controls: FC = () => {
  // Redux
  const fetching = useTypedSelector(state => state.assets.fetching)
  const pageIndex = useTypedSelector(state => state.assets.pageIndex)

  return (
    <Box
      paddingY={2}
      style={{
        borderBottom: '1px solid #333' // TODO: use theme colors
      }}
    >
      {/* Rows: search / filters / orders  */}
      <Box marginBottom={2}>
        <Flex
          align="flex-start"
          direction={['column', 'column', 'column', 'column', 'row']}
          justify="space-between"
        >
          {/* Search + Filters */}
          <Flex
            flex={1}
            style={{
              alignItems: 'flex-start',
              // alignItems: 'center',
              // border: '2px solid red',
              height: '100%',
              justifyContent: 'flex-start',
              position: 'relative',
              width: '100%'
            }}
          >
            <Box
              marginX={2}
              style={{
                minWidth: '200px'
              }}
            >
              {/* Search */}
              <TextInputSearch />
            </Box>

            {/* Filters */}
            <SearchFacets />
          </Flex>
        </Flex>
      </Box>

      {/* Views + filters + orders*/}
      <Box>
        <Flex align="center" justify={['space-between']}>
          <Box marginX={2}>
            <ButtonViewGroup />
          </Box>

          <Box marginX={2}>
            <OrderSelect />
          </Box>
        </Flex>
      </Box>

      {/* Progress bar */}
      <Progress key={pageIndex} loading={fetching} />
    </Box>
  )
}

export default Controls
