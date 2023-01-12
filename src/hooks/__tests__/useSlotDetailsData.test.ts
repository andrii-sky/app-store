import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import useSlotDetailsData from '../useSlotDetailsData';
import { slotResult } from './testData';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

describe('useSlotDetailsData', () => {
  it('return correct data', () => {
    const mockSelectedSlot = slotResult.linearChannel.slot;
    useSelector
      // mock selectors.selectedSlotIsLoading
      .mockReturnValueOnce(false)
      // mock selectors.selectedSlot
      .mockReturnValueOnce(mockSelectedSlot)
      // mock selectors.selectedSlotError
      .mockReturnValueOnce(undefined);
    useEffect.mockImplementationOnce(a => a()).mockImplementationOnce(a => a()());
    const {
      title,
      image,
      synopsis,
      isOnAir,
      isShow,
      isSport,
      isLoading,
      isLoadingError,
      isRecordable,
      isSlotEntitled,
      isVodEntitled,
      brand,
      slot,
      vodAsset,
    } = useSlotDetailsData('fakeSlotStartTime', 'fakeChannelId');
    expect(title).toEqual('Cliveden: A Very British Country House S1 E3');
    expect(image).toEqual(
      'https://images.skyone.co.nz/media/images/stills/content/339868/dabb9d4d50c926f0afb516db333aa018.jpg',
    );
    expect(synopsis).toEqual(
      "Unprecedented guest numbers put Cliveden House hotel under pressure. Meanwhile, a Chinese wedding with a 13-strong camera crew sees tensions rise as the day's schedule goes out the window.",
    );
    expect(isOnAir).toBeFalsy();
    expect(isShow).toBeTruthy();
    expect(isSport).toBeFalsy();
    expect(isLoading).toBeFalsy();
    expect(isLoadingError).toBeUndefined();
    expect(isRecordable).toBeFalsy();
    expect(isSlotEntitled).toBeTruthy();
    expect(isVodEntitled).toBeTruthy();
    expect(brand).toEqual(mockSelectedSlot.programme.show);
    expect(slot).toEqual(mockSelectedSlot);
    expect(vodAsset).toEqual(mockSelectedSlot.programme.asset);
    expect(mockDispatch).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        CALL_API: expect.objectContaining({
          actionTypes: expect.arrayContaining(['epg/FETCH_SLOT_BY_START_TIME_REQUEST']),
        }),
      }),
    );
    expect(mockDispatch).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: 'epg/CLEAR_SELECTED_SLOT',
      }),
    );
  });

  it('skip clear when unmount', () => {
    const mockSelectedSlot = slotResult.linearChannel.slot;
    useSelector
      // mock selectors.selectedSlotIsLoading
      .mockReturnValueOnce(false)
      // mock selectors.selectedSlot
      .mockReturnValueOnce(mockSelectedSlot)
      // mock selectors.selectedSlotError
      .mockReturnValueOnce(undefined);
    useEffect.mockImplementationOnce(a => a()).mockImplementationOnce(a => a()());
    useSlotDetailsData('fakeSlotStartTime', 'fakeChannelId', true);
    expect(mockDispatch).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        CALL_API: expect.objectContaining({
          actionTypes: expect.arrayContaining(['epg/FETCH_SLOT_BY_START_TIME_REQUEST']),
        }),
      }),
    );
  });

  it('get watch from start', () => {
    const mockSelectedSlot = slotResult.linearChannel.slot;
    useSelector
      // mock selectors.selectedSlotIsLoading
      .mockReturnValueOnce(false)
      // mock selectors.selectedSlot
      .mockReturnValueOnce(mockSelectedSlot)
      // mock selectors.selectedSlotError
      .mockReturnValueOnce(undefined);
    useEffect.mockImplementationOnce(a => a()).mockImplementationOnce(a => a()());
    useSlotDetailsData('fakeSlotStartTime', 'fakeChannelId', true, true);
    expect(mockDispatch).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        CALL_API: expect.objectContaining({
          actionTypes: expect.arrayContaining(['epg/FETCH_SLOT_BY_START_TIME_REQUEST']),
        }),
      }),
    );
    expect(mockDispatch).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: 'epg/CLEAR_SELECTED_SLOT',
      }),
    );
  });
});
