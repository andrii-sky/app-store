import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Episode, LinearSlot, Maybe, Movie, Show, VodAsset } from '@/types/graph-ql';
import utils from '@/utils';
import { ImageAssetType } from '@/types/enums';
import actions from '@/actions';
import selectors from '@/selectors';

export interface SlotDetailsData {
  isLoading: boolean;
  isLoadingError: any;
  title: string;
  image: string;
  synopsis: string;
  isOnAir: boolean;
  isShow: boolean;
  isSport: boolean;
  isRecordable: boolean;
  isSlotEntitled: boolean;
  isVodEntitled: boolean;
  brand: Movie | Show;
  slot: LinearSlot;
  vodAsset: Maybe<VodAsset>;
}

const useSlotDetailsData = (
  slotStartTime: string,
  channelId: string,
  skipClearWhenUnmount?: boolean,
  needReverseEPG = false,
): SlotDetailsData => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectors.epg.selectedSlotIsLoading);
  const selectedSlot = useSelector(selectors.epg.selectedSlot);
  const selectedSlotChannel = useSelector(selectors.epg.selectedSlotChannel);
  const isLoadingError = useSelector(selectors.epg.selectedSlotError);
  const brand = utils.slot.isShow(selectedSlot)
    ? (selectedSlot?.programme as Episode)?.show
    : (selectedSlot?.programme as Movie);

  const isShow = utils.slot.isShow(selectedSlot);
  const isSport = utils.slot.isSport(selectedSlot);
  const isOnAir = selectedSlot && utils.slot.isSlotOnAir(selectedSlot);
  const title = utils.slot.getSlotTitle(selectedSlot);
  const image = brand?.[ImageAssetType.ContentTileHorizontal]?.uri;
  const synopsis = utils.title.getProgrammeSynopsis(selectedSlot?.programme, brand); // fallback to brand's synopsis when episode doesn't have
  const isRecordable = utils.slot.isRecordable(selectedSlot);
  const isSlotEntitled = utils.entitlements.isChannelEntitled(selectedSlotChannel);
  const vodAsset = selectedSlot?.programme?.asset;
  const isVodEntitled = utils.entitlements.isVodEntitled(selectedSlot?.programme);

  useEffect(() => {
    if (
      slotStartTime &&
      channelId
      // TODO avoid duplicated fetch, this would fail the acceptance test for RN, as the mock server always return the different slot.
      // !(selectedSlot?.start === slotStartTime && selectedSlot?.channel?.id === channelId)
    ) {
      dispatch(actions.epg.fetchSlotByStartTime(channelId, slotStartTime, needReverseEPG));
    }
  }, [dispatch, slotStartTime, channelId, needReverseEPG]);

  useEffect(
    () => () => {
      if (!skipClearWhenUnmount) {
        dispatch(actions.epg.clearSelectedSlot());
      }
    },
    [dispatch, skipClearWhenUnmount],
  );

  return {
    isLoading,
    isLoadingError,
    title,
    image,
    synopsis,
    isOnAir,
    isShow,
    isSport,
    isRecordable,
    isSlotEntitled,
    isVodEntitled,
    brand,
    slot: selectedSlot,
    vodAsset,
  };
};

export default useSlotDetailsData;
