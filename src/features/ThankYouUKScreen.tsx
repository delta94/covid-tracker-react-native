import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import React, { FC, useState, useRef, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import { blog004, dataPage003, incidence004, timUpdate002 } from '@assets';
import { colors } from '@theme';
import { AppRating, shouldAskForRating } from '@covid/components/AppRating';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import InviteToStudy from '@covid/components/InviteToStudy';
import { Header } from '@covid/components/Screen';
import ShareThisApp from '@covid/components/ShareThisApp';
import { BrandedButton, ClickableText, HeaderText, RegularText } from '@covid/components/Text';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { ICoreService } from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';

import { ScreenParamList } from './ScreenParamList';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ThankYouUK'>;
  route: RouteProp<ScreenParamList, 'ThankYouUK'>;
};

type State = {
  askForRating: boolean;
  inviteToStudy: boolean;
  playing: boolean;
};

const initialState = {
  askForRating: false,
  inviteToStudy: false,
  playing: false,
};

export const ThankYouUKScreen = (props: RenderProps) => {
  const userService = useInjection<ICoreService>(Services.User);

  const [askForRating, setAskForRating] = useState<boolean>(false);
  const [inviteToStudy, setInviteToStudy] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const playerRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const ask = await shouldAskForRating();
      setAskForRating(ask);
      const invite = await userService.shouldAskForValidationStudy(true);
      setInviteToStudy(invite);
    }

    fetchData();
  }, []);

  return (
    <>
      {askForRating && <AppRating />}
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.rootContainer}>
            <Header>
              <HeaderText style={styles.headerText}>{i18n.t('thank-you-uk.title')}</HeaderText>
            </Header>

            <View>
              <RegularText style={styles.subTitle}>{i18n.t('thank-you-uk.subtitle')}</RegularText>
            </View>

            <ExternalCallout
              link="https://covid.joinzoe.com/your-contribution?utm_source=App"
              calloutID="data_page_003"
              imageSource={dataPage003}
              aspectRatio={1.55}
            />

            <ExternalCallout
              link="https://covid.joinzoe.com/data#daily-new-cases?utm_source=App"
              calloutID="incidence_004"
              imageSource={incidence004}
              aspectRatio={1.5}
            />

            <YoutubePlayer
              ref={playerRef}
              height={220}
              // width={400}
              videoId="ulG3Fet-SR8"
              play={playing}
              onChangeState={(event) => console.log(event)}
              onReady={() => console.log('ready')}
              onError={(e) => console.log(e)}
              onPlaybackQualityChange={(q) => console.log(q)}
              volume={50}
              playbackRate={1}
              initialPlayerParams={{
                cc_lang_pref: 'us',
                showClosedCaptions: true,
              }}
            />

            <ExternalCallout
              link="https://covid.joinzoe.com/post/cancer-covid-risk?utm_source=App"
              calloutID="blog_004"
              imageSource={blog004}
              aspectRatio={1.551}
            />

            <View style={{ margin: 10 }} />

            <ShareThisApp />

            {inviteToStudy && <InviteToStudy placement="ThankYouUK" />}

            <View style={styles.content}>
              <RegularText style={styles.signOff}>{i18n.t('thank-you-uk.sign-off')}</RegularText>
            </View>

            <BrandedButton onPress={() => props.navigation.navigate('WelcomeRepeat')} style={styles.ctaSingleProfile}>
              <Text style={styles.ctaSingleProfileText}>{i18n.t('thank-you-uk.cta-single-profile')}</Text>
            </BrandedButton>

            <View style={styles.ctaMultipleProfile}>
              <ClickableText
                onPress={() => props.navigation.navigate('SelectProfile')}
                style={styles.ctaMultipleProfileText}>
                {i18n.t('thank-you-uk.cta-multi-profile')}
              </ClickableText>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    marginTop: 15,
  },
  subTitle: {
    textAlign: 'center',
    marginBottom: 15,
  },
  signOff: {
    textAlign: 'center',
  },
  content: {
    marginVertical: 32,
    marginHorizontal: 18,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  rootContainer: {
    alignSelf: 'center',
    maxWidth: 500,
    padding: 10,
  },
  socialIconContainer: {
    marginVertical: -10,
    borderRadius: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  socialIcon: {
    resizeMode: 'contain',
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  ctaMultipleProfile: {
    paddingTop: 15,
    paddingBottom: 24,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ctaMultipleProfileText: {
    color: colors.primary,
  },
  ctaSingleProfileText: {
    color: colors.primary,
  },
  ctaSingleProfile: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 40,
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.primary,
    borderWidth: 1,
  },
});
