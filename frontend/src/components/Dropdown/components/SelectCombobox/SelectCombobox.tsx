import { forwardRef, useCallback, useMemo } from 'react'
import {
  Flex,
  Icon,
  InputGroup,
  Stack,
  Text,
  useMergeRefs,
  VisuallyHidden,
} from '@chakra-ui/react'

import Input from '~components/Input'

import { useSelectContext } from '../../SelectContext'
import { itemToIcon, itemToLabelString } from '../../utils/itemUtils'

import { ComboboxClearButton } from './ComboboxClearButton'
import { ToggleChevron } from './ToggleChevron'

export const SelectCombobox = forwardRef<HTMLInputElement>(
  (_props, ref): JSX.Element => {
    const {
      getComboboxProps,
      toggleMenu,
      selectedItem,
      getInputProps,
      styles,
      isDisabled,
      isSearchable,
      isReadOnly,
      isInvalid,
      inputValue,
      isRequired,
      placeholder,
      setIsFocused,
      isOpen,
      resetInputValue,
      inputAria,
      inputRef,
    } = useSelectContext()

    const mergedInputRef = useMergeRefs(inputRef, ref)

    const selectedItemMeta = useMemo(
      () => ({
        icon: itemToIcon(selectedItem),
        label: itemToLabelString(selectedItem),
      }),
      [selectedItem],
    )

    const handleToggleMenu = useCallback(() => {
      if (isReadOnly || isDisabled) return
      return toggleMenu()
    }, [isDisabled, isReadOnly, toggleMenu])

    return (
      <Flex>
        <VisuallyHidden id={inputAria.id}>{inputAria.label}</VisuallyHidden>
        <InputGroup
          pos="relative"
          display="grid"
          gridTemplateColumns="1fr"
          {...getComboboxProps({
            disabled: isDisabled,
            readOnly: isReadOnly,
            required: isRequired,
            'aria-expanded': !!isOpen,
            onFocus: () => setIsFocused(true),
          })}
        >
          <Stack
            visibility={inputValue ? 'hidden' : 'initial'}
            direction="row"
            spacing="1rem"
            gridArea="1 / 1 / 2 / 3"
            pointerEvents="none"
            pl="calc(1rem + 1px)"
            pr="calc(2.75rem + 1px)"
            align="center"
            zIndex={2}
          >
            {selectedItemMeta.icon ? (
              <Icon
                ml="-0.25rem"
                sx={styles.icon}
                as={selectedItemMeta.icon}
                aria-disabled={isDisabled}
              />
            ) : null}
            <Text
              textStyle="body-1"
              noOfLines={1}
              color={isDisabled ? 'neutral.500' : undefined}
            >
              {selectedItemMeta.label}
            </Text>
          </Stack>
          <Input
            isReadOnly={!isSearchable || isReadOnly}
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            placeholder={selectedItem ? undefined : placeholder}
            sx={styles.field}
            {...getInputProps({
              onClick: handleToggleMenu,
              onBlur: () => !isOpen && resetInputValue(),
              ref: mergedInputRef,
              'aria-describedby': inputAria.id,
            })}
          />
          <ToggleChevron />
        </InputGroup>
        <ComboboxClearButton />
      </Flex>
    )
  },
)
