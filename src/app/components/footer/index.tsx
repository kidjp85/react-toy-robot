import React, { memo } from 'react';
import { Flex, Heading } from '@react-yuki/ui';
import { Container } from 'app/components/styledComponents';

const Footer = memo(() => (
  <Flex>
    <Container flexDirection="column" py={4} alignItems="center" justifyContent="center">
      <Heading fontWeight={3} fontSize={4} m={0} mb={2} color="gray.8" textAlign="center">
        &copy; {new Date().getFullYear()} - Asher Nguyen
      </Heading>
    </Container>
  </Flex>
));

Footer.displayName = 'Footer';

export default Footer;
