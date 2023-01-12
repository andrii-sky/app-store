import { BrandType } from '@/types/enums/BrandType';
import {
  Maybe,
  Movie,
  Show,
  ShowType,
  VodAsset,
  LinearSlot,
  Episode,
  CustomerPayPerViewOffer,
  CustomerTvodOffer,
} from '@/types/graph-ql';
import { isNilOrEmpty, isNotNilOrEmpty } from '@/utils/utils';
import { isSlotOnAir } from './Slot';
import { isShow, isSport, getFirstAvailableSlot } from './Title';

export const hasPlayableVod = (brand: Movie | Show): boolean => {
  if (brand.__typename === BrandType.Movie) {
    return isNotNilOrEmpty(brand.asset);
  }
  if (brand.__typename === BrandType.Show) {
    // TODO This sports-speicific rule should be set from BE, but we could not apply the change on API, as the native old version handle it in different way.
    // We could revisit this once BE updates.
    // Sports show would always ignore the vod.
    if (isSport(brand)) {
      return false;
    }
    return isNotNilOrEmpty(brand.defaultEpisode?.asset);
  }
  return false;
};

export const shouldDisplaySlotDetail = (brand: Show | Movie): boolean => {
  if (isNilOrEmpty(brand.slots)) {
    return false;
  }
  return !hasPlayableVod(brand);
};

export const getSynopsis = (brand: Show | Movie) => {
  if (isShow(brand)) {
    const slot = getFirstAvailableSlot(brand);
    return (brand as Show).type === ShowType.Sport && slot?.programme?.synopsis
      ? slot?.programme?.synopsis
      : brand.synopsis;
  }
  return brand.synopsis;
};

export const getImage = (_brand: Show | Movie, brandImage: string): string => brandImage;

type ButtonSetting = {
  visible: boolean;
};

type HeroPlayButtonSetting = ButtonSetting & {
  isVod: boolean;
  hasTvod: boolean;
  hasPpv: boolean;
  videoContent?: Maybe<Episode | LinearSlot | VodAsset>;
};

const hasPaidContent = (
  offer: CustomerPayPerViewOffer | CustomerTvodOffer | null | undefined,
  deviceId?: string,
) => {
  return (
    isNotNilOrEmpty(offer) &&
    isNilOrEmpty(
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      offer?.purchases?.find(
        purchase => isNotNilOrEmpty(deviceId) && purchase?.deviceId === deviceId,
      ),
    )
  );
};

const containsTvod = (brand: any, deviceId?: string) => {
  const offer = (brand as Movie)?.schedule?.tvodOffer;
  return hasPaidContent(offer, deviceId);
};

const containsPpv = (brand: any, deviceId?: string) => {
  const offer = (brand as Show)?.slots?.find(slot => slot.payPerViewOffer)?.payPerViewOffer;
  return hasPaidContent(offer, deviceId);
};

// TODO we need to add entitlement check and button text into settings
export const getPlayButtonSetting = (
  brand: Show | Movie,
  deviceId?: string,
): HeroPlayButtonSetting => {
  const firstAvailableSlot = getFirstAvailableSlot(brand);
  const hasTvod = containsTvod(brand, deviceId);
  const hasPpv = containsPpv(brand, deviceId);
  const isSlotLive = firstAvailableSlot && isSlotOnAir(firstAvailableSlot);
  // Vod has high priority than linearSlot
  if (hasPlayableVod(brand)) {
    if (brand.__typename === BrandType.Show) {
      return {
        visible: true,
        isVod: true,
        hasTvod,
        hasPpv,
        videoContent: brand.defaultEpisode,
      };
    }
    if (brand.__typename === BrandType.Movie) {
      return { visible: true, isVod: true, videoContent: brand.asset, hasTvod, hasPpv };
    }
  }
  if (isSlotLive) {
    return {
      visible: true,
      isVod: false,
      videoContent: firstAvailableSlot,
      hasTvod,
      hasPpv,
    };
  }
  return {
    visible: false,
    isVod: false,
    hasTvod,
    hasPpv,
  };
};

// Display logic for record button.
// TODO we need to add entitlement check and button text into settings
export const getRecordButtonSetting = (brand: Show | Movie): ButtonSetting => {
  const firstAvailableSlot = getFirstAvailableSlot(brand);
  const playButtonSetting = getPlayButtonSetting(brand);
  // hide it if the play button is displayed for vod
  if (firstAvailableSlot && !(playButtonSetting.visible && playButtonSetting.isVod)) {
    return {
      visible: true,
    };
  }
  return {
    visible: false,
  };
};

// TODO we need to add entitlement check and button text into settings
export const getWatchlistButtonSetting = (): ButtonSetting => ({ visible: true });
