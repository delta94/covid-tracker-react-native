import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import { StickyBottomButton } from '@covid/components/Screen';
import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { TextInfoScreen } from '@covid/components/Screens/TextInfoScreen';
import i18n from '@covid/locale/i18n';
import Analytics, { events } from '@covid/core/Analytics';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyIntro'>;
  route: RouteProp<ScreenParamList, 'DietStudyIntro'>;
};

const DietStudyIntroScreen: React.FC<Props> = ({ route, navigation }) => {
  const currentPatient = AssessmentCoordinator.assessmentData.currentPatient;

  const accept = () => {
    Analytics.track(events.ACCEPT_DIET_STUDY);
  };

  const defer = () => {
    Analytics.track(events.DEFER_DIET_STUDY);
  };

  const skip = () => {
    Analytics.track(events.DECLINE_DIET_STUDY);
  };

  return (
    <TextInfoScreen
      profile={currentPatient.profile}
      navigation={navigation}
      headerLabel={i18n.t('diet-study.intro.title')}
      primaryLabel={i18n.t('diet-study.intro.description-1')}
      secondaryLabel={i18n.t('diet-study.intro.description-2')}
      primaryButtonLabel={i18n.t('diet-study.intro.cta-yes')}
      secondaryButtonLabel={i18n.t('diet-study.intro.cta-no-later')}
      primaryButtonAction={accept}
      secondaryButtonAction={skip}
      bottomView={<StickyBottomButton label={i18n.t('diet-study.intro.cta-no-never')} onPress={skip} />}
    />
  );
};

export default DietStudyIntroScreen;