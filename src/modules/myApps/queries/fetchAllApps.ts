import { IMAGE_RATIOS } from '@/utils/Images';

const FETCH_ALL_APPS_QUERY = `query MyBoxApps {
  myBoxApps {
    id
    mandatory
    favourite
    lastOpened
    canUnfavourite
    suggestedTileImage(aspectRatio: ${IMAGE_RATIOS.HORIZONTAL}) {
      uri
    }
  }
}`;
export default FETCH_ALL_APPS_QUERY;
