import React from "react"
import PropTypes from 'prop-types';
import {
  Spinner,
  HStack,
  Heading
} from "native-base"

export const Loading = ({ message }) => {
  return (
    <HStack space={2} alignItems="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        {message || 'Loading'}
      </Heading>
    </HStack>
  )
}

Loading.defaultProps = {
  message: '',
};

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;
