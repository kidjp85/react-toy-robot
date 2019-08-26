import React, { memo } from 'react';
import { Flex, Text } from '@react-yuki/ui';
import ArrowRightIcon from '@react-yuki/icons/lib/ArrowRightLong';
import { PageHeading } from 'app/components/styledComponents';
import { colors } from 'app/configs/styles';
import { InfoBoxProps } from 'app/components/infoBox/types';

const InfoBox = memo<InfoBoxProps>(({ title, content }) => {
  const renderDescription = (content: string, idx: number) => (
    <Flex width={1} key={`game-description-${idx}`} alignItems="flex-start" mb={2}>
      <ArrowRightIcon
        width={14}
        height={24}
        color={colors.gray[8]}
        mr={2}
        flex="none"
        strokeWidth={3}
      />
      <Text lineHeight="large" color="gray.8" fontSize={[3, 3, 4, 4]}>
        {content}
      </Text>
    </Flex>
  );

  return (
    <Flex flexDirection="column" mb={4}>
      <PageHeading>{title}</PageHeading>
      <Flex flexDirection="column">{content.map(renderDescription)}</Flex>
    </Flex>
  );
});

InfoBox.displayName = 'InfoBox';

export default InfoBox;
