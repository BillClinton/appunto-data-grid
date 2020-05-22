import { useState, useEffect } from 'react'
import { useTheme } from '@chakra-ui/core'

/**
 * TODO: see if chakra exposes breakpoints in future version to avoid this hack:
 * https://github.com/chakra-ui/chakra-ui/pull/565/commits/1a2ad951336b0219f584336195a076bff8ad104a
 * https://github.com/chakra-ui/chakra-ui/blob/dev-ts/packages/media-query/todo.md
 */

const useChakraBreakpoints = () => {
  const [breakpointIndex, setBreakpointIndex] = useState(null)
  const { breakpoints } = useTheme()

  const getCurrentBreakpointIndex = () => {
    // get base font pixel size
    const baseFontSize = window
      .getComputedStyle(document.documentElement)
      .fontSize.replace(/\D/g, '')

    // convert to em value for comparison to theme breakpoints
    const emWidth = window.innerWidth / parseInt(baseFontSize)

    // find the chakra breakpoint
    const breakpoint = breakpoints.reduce((a, v) =>
      emWidth > parseInt(a.replace(/\D/g, ''), 10) ? v : a
    )

    setBreakpointIndex(breakpoints.indexOf(breakpoint))
  }

  useEffect(() => {
    getCurrentBreakpointIndex()
    window.addEventListener('resize', getCurrentBreakpointIndex)
    return () => window.removeEventListener('resize', getCurrentBreakpointIndex)
  }, [])

  return { breakpointIndex }
}

export default useChakraBreakpoints
