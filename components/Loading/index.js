import React from "react"
import PropTypes from 'prop-types';
import {
  Spinner,
  HStack,
  Heading,
} from "native-base";

const Loading = ({ message }) => {
  return (
    <HStack space={2} alignItems="center">
      <Spinner accessibilityLabel="Loading App" />
      <Heading color="primary.500" fontSize="md">
        {message || 'Loading...'}
      </Heading>
    </HStack>
  )
};

Loading.defaultProps = {
    message: '',
};

Loading.propTypes = {
    message: PropTypes.string,
};

export default Loading;
