const UNFAVOURITE_BOX_APP = `mutation unfavouriteBoxApp($appId: ID!) {
  unfavouriteBoxApp(appId: $appId)
}`;
export default UNFAVOURITE_BOX_APP;
