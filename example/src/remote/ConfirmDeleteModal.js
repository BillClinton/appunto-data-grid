import React from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/core'

const ConfirmDeleteModal = ({
  title,
  children,
  deleteCondemned,
  clearCondemned
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!isOpen) {
    onOpen()
  }

  const cancelDeletion = () => {
    clearCondemned()
    onClose()
  }

  const deleteAndClose = () => {
    deleteCondemned()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={cancelDeletion} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button variantColor='blue' mr={3} onClick={cancelDeletion}>
            Cancel
          </Button>
          <Button onClick={deleteAndClose}>Remove</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmDeleteModal
