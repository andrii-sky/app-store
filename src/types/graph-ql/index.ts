export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  URI: any;
  URIPath: any;
  LocalDate: any;
  DateTime: any;
  Duration: any;
  JSON: any;
  Void: any;
  Decimal: any;
  CurrencyCode: any;
};

export type Query = {
  __typename?: 'Query';
  experience: SkyExperience;
  rootSections: Array<Maybe<Section>>;
  section?: Maybe<Section>;
  group?: Maybe<Group>;
  webPage?: Maybe<WebPage>;
  search: SearchResults;
  title?: Maybe<Title>;
  show?: Maybe<Show>;
  episode?: Maybe<Episode>;
  movie?: Maybe<Movie>;
  collection?: Maybe<Collection>;
  channels: Array<Maybe<Channel>>;
  channelGroups: Array<Maybe<ChannelGroup>>;
  channelGroup?: Maybe<ChannelGroup>;
  linearChannel?: Maybe<LinearChannel>;
  linearChannels: Array<Maybe<LinearChannel>>;
  linearChannelGroups: Array<Maybe<LinearChannelGroup>>;
  linearChannelGroup?: Maybe<LinearChannelGroup>;
  /**
   * Return null if the slot does not exist
   * Note: The same slotId may return a different episode/programme over time. This is because the upstream
   * systems de-link and associate other programmes to the already alloocated slot. So the frontend should always
   * check for the programme details. If they are changed, then any details that are already persisted should be discarded.
   */
  linearChannelSlot?: Maybe<LinearSlot>;
  recentChannels: Array<Maybe<LinearChannel>>;
  myList: Array<Maybe<MyListContent>>;
  user: User;
  customer: CustomerAccount;
  customerProfileAvatarGroups: Array<Maybe<CustomerProfileAvatarGroup>>;
  /**
   * Return all apps the API is aware of for this profile:
   * - recently opened
   * - favourited
   * - mandatory (uninstallable)
   *
   * This may include apps that are not installed on the box, and it won't contain all apps that are installed.
   *
   * Order will be in display order as defined by curators, then by favourite, then by recently used.
   * @deprecated Field no longer supported
   */
  myBoxApps: Array<Maybe<BoxApp>>;
  getOfflinePlayback: VodPlaybackResponse;
  getOfflineVodPlayback: VodPlaybackResponse;
};

export type QueryExperienceArgs = {
  appId: AppId;
};

export type QuerySectionArgs = {
  id: Scalars['ID'];
};

export type QueryGroupArgs = {
  id: Scalars['ID'];
};

export type QueryWebPageArgs = {
  path: Scalars['URIPath'];
};

export type QuerySearchArgs = {
  term: Scalars['String'];
};

export type QueryTitleArgs = {
  id: Scalars['ID'];
};

export type QueryShowArgs = {
  id: Scalars['ID'];
};

export type QueryEpisodeArgs = {
  id: Scalars['ID'];
};

export type QueryMovieArgs = {
  id: Scalars['ID'];
};

export type QueryCollectionArgs = {
  id: Scalars['ID'];
};

export type QueryChannelGroupArgs = {
  id: Scalars['ID'];
};

export type QueryLinearChannelArgs = {
  id: Scalars['ID'];
};

export type QueryLinearChannelGroupArgs = {
  id: Scalars['ID'];
};

export type QueryLinearChannelSlotArgs = {
  id: Scalars['ID'];
};

export type QueryGetOfflinePlaybackArgs = {
  assetId: Scalars['ID'];
};

export type QueryGetOfflineVodPlaybackArgs = {
  assetId: Scalars['ID'];
  deviceId: Scalars['ID'];
  playbackDevice?: Maybe<PlaybackDevice>;
};

export type SkyExperience = {
  __typename?: 'SkyExperience';
  appId: AppId;
  config: AppConfiguration;
};

export type AppConfiguration = {
  __typename?: 'AppConfiguration';
  auth: AppAuthConfiguration;
};

export type AppAuthConfiguration = {
  __typename?: 'AppAuthConfiguration';
  connectionId: Scalars['ID'];
};

export enum AppId {
  SkyBox = 'SKY_BOX',
  SkyGoAndroidMobile = 'SKY_GO_ANDROID_MOBILE',
  SkyGoIos = 'SKY_GO_IOS',
  SkyGoWeb = 'SKY_GO_WEB',
  SkyPod = 'SKY_POD',
}

export type Mutation = {
  __typename?: 'Mutation';
  savePlaybackPosition: WatchProgress;
  removeAllPlaybackPositions?: Maybe<Scalars['Void']>;
  saveRecentChannel?: Maybe<Scalars['Void']>;
  removeAllRecentChannels?: Maybe<Scalars['Void']>;
  addToMyList?: Maybe<Scalars['Void']>;
  removeFromMyList?: Maybe<Scalars['Void']>;
  removeAllFromMyList?: Maybe<Scalars['Void']>;
  startLinearPlayback: LinearPlaybackResponse;
  startVodPlayback: VodPlaybackResponse;
  linearPlaybackHeartbeat?: Maybe<PlaybackHeartbeatResponse>;
  vodPlaybackHeartbeat?: Maybe<PlaybackHeartbeatResponse>;
  stopLinearPlayback?: Maybe<Scalars['Void']>;
  stopVodPlayback?: Maybe<Scalars['Void']>;
  registerDevice: RegisterDeviceResponse;
  updateDeviceName: Device;
  deactivateDevice: DeactivateDeviceResponse;
  removeAllDevices?: Maybe<Scalars['Void']>;
  activateSkyDecoder: SkyDecoderActivationResponse;
  record?: Maybe<Scalars['Void']>;
  enterParentalPin: Scalars['Boolean'];
  validateParentalPin?: Maybe<PinValidationResponse>;
  setParentalPin?: Maybe<Scalars['Void']>;
  resetParentalPin?: Maybe<Scalars['Void']>;
  setParentalControl?: Maybe<Scalars['Void']>;
  setParentallyApprovedClassification?: Maybe<Scalars['Void']>;
  /**
   * Mark an app as favourited for this profile.
   * Returns true if the app was unfavourited, false if it was not.
   */
  favouriteBoxApp: Scalars['Boolean'];
  /**
   * Remove an app from this profile's favourites, if present.
   * Returns true if the app was favourited, false if it was not.
   */
  unfavouriteBoxApp: Scalars['Boolean'];
  /** Record an app being opened by this profile, to track recently used apps. */
  boxAppOpened: Scalars['DateTime'];
  forgetBoxApp?: Maybe<Scalars['Void']>;
  forgetAllBoxApps?: Maybe<Scalars['Void']>;
  removeAllUserAttributes?: Maybe<Scalars['Void']>;
  createProfile: CreateCustomerProfileResponse;
  updateProfile: CustomerProfile;
  deleteProfile?: Maybe<Scalars['Void']>;
  purchaseTvod: PurchaseTvodResponse;
  /**
   * Removes an active tvod purchase for this customer. Because MSL do not expose a reverse purchase API, this will not
   * actually reverse the charge in ICOMS, but just remove it from the view of this API. As a result, this is currently only
   * useful for test purposes, and will return an error if used in a production environment.
   */
  reverseTvodPurchase?: Maybe<Scalars['Void']>;
  purchasePayPerView: PurchasePayPerViewResponse;
  /**
   * Removes an active tvod purchase for this customer. Because MSL do not expose a reverse purchase API, this will not
   * actually reverse the charge in ICOMS, but just remove it from the view of this API. As a result, this is currently only
   * useful for test purposes, and will return an error if used in a production environment.
   */
  reversePayPerViewPurchase?: Maybe<Scalars['Void']>;
  /**
   * Mark a notification as consumed, which indications it has been actioned or read by the customer.
   *
   * If the notification is already consumed, this does nothing.
   *
   * Returns the updated list of non-consumed notifications for the account.
   */
  consumeCustomerNotification: Array<CustomerNotification>;
};

export type MutationSavePlaybackPositionArgs = {
  assetId: Scalars['ID'];
  position: Scalars['Duration'];
};

export type MutationSaveRecentChannelArgs = {
  channelId: Scalars['ID'];
};

export type MutationAddToMyListArgs = {
  id: Scalars['ID'];
};

export type MutationRemoveFromMyListArgs = {
  id: Scalars['ID'];
};

export type MutationStartLinearPlaybackArgs = {
  channelId: Scalars['ID'];
  deviceId: Scalars['ID'];
};

export type MutationStartVodPlaybackArgs = {
  assetId: Scalars['ID'];
  deviceId: Scalars['ID'];
  playbackDevice?: Maybe<PlaybackDevice>;
};

export type MutationLinearPlaybackHeartbeatArgs = {
  channelId: Scalars['ID'];
  deviceId: Scalars['ID'];
};

export type MutationVodPlaybackHeartbeatArgs = {
  assetId: Scalars['ID'];
  deviceId: Scalars['ID'];
};

export type MutationStopLinearPlaybackArgs = {
  channelId: Scalars['ID'];
  deviceId: Scalars['ID'];
};

export type MutationStopVodPlaybackArgs = {
  assetId: Scalars['ID'];
  deviceId: Scalars['ID'];
};

export type MutationRegisterDeviceArgs = {
  registerDevice?: Maybe<RegisterDeviceInput>;
};

export type MutationUpdateDeviceNameArgs = {
  deviceId: Scalars['ID'];
  deviceName: Scalars['String'];
};

export type MutationDeactivateDeviceArgs = {
  deviceId: Scalars['ID'];
};

export type MutationActivateSkyDecoderArgs = {
  serialNumber: Scalars['ID'];
  chipId: Scalars['ID'];
};

export type MutationRecordArgs = {
  record: RecordInput;
};

export type MutationEnterParentalPinArgs = {
  enteredPin: Scalars['String'];
};

export type MutationValidateParentalPinArgs = {
  enteredPin: Scalars['String'];
};

export type MutationSetParentalPinArgs = {
  pin: Scalars['String'];
};

export type MutationSetParentalControlArgs = {
  enabled: Scalars['Boolean'];
};

export type MutationSetParentallyApprovedClassificationArgs = {
  code: Classification;
};

export type MutationFavouriteBoxAppArgs = {
  appId: Scalars['ID'];
};

export type MutationUnfavouriteBoxAppArgs = {
  appId: Scalars['ID'];
};

export type MutationBoxAppOpenedArgs = {
  appId: Scalars['ID'];
};

export type MutationForgetBoxAppArgs = {
  appId: Scalars['ID'];
};

export type MutationCreateProfileArgs = {
  name: Scalars['String'];
  avatar?: Maybe<Scalars['ID']>;
};

export type MutationUpdateProfileArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
  avatar: Scalars['ID'];
};

export type MutationDeleteProfileArgs = {
  id: Scalars['ID'];
};

export type MutationPurchaseTvodArgs = {
  deviceId: Scalars['ID'];
  tvodOfferId: Scalars['ID'];
};

export type MutationReverseTvodPurchaseArgs = {
  deviceId: Scalars['ID'];
  tvodOfferId: Scalars['ID'];
};

export type MutationPurchasePayPerViewArgs = {
  deviceId: Scalars['ID'];
  payPerViewOfferId: Scalars['ID'];
};

export type MutationReversePayPerViewPurchaseArgs = {
  deviceId: Scalars['ID'];
  payPerViewOfferId: Scalars['ID'];
};

export type MutationConsumeCustomerNotificationArgs = {
  id: Scalars['ID'];
};

export type CollectionMember = Show | Movie | LinearChannel | Collection;

export type GroupMember = Show | Movie | Collection | LinearChannel | BoxApp;

export type SectionHome = ContentHome | TvGuideHome | BrowseHome;

export type HeroContent = Show | Movie;

export type LinearContent = Episode | Movie;

export type MyListContent = Show | Movie | LinearChannel;

export type Channel = LinearChannel | AppPromotionChannel;

export type Title = {
  id: Scalars['ID'];
  title: Scalars['String'];
  synopsis?: Maybe<Scalars['String']>;
  rating?: Maybe<Rating>;
  genres: Array<Maybe<Collection>>;
  allGenres: Array<Tag>;
  primaryGenres: Array<Tag>;
  tileImage: Image;
  heroImage: Image;
  detailImage: Image;
  onMyList: Scalars['Boolean'];
  soundtrack?: Maybe<Album>;
  trailer?: Maybe<VodAsset>;
  characters: Array<Maybe<Character>>;
  slots: Array<LinearSlot>;
};

export type TitleTileImageArgs = {
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type TitleHeroImageArgs = {
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type TitleDetailImageArgs = {
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type TitleCharactersArgs = {
  limitTo?: Maybe<Scalars['Int']>;
};

export type Show = Title &
  WebPage &
  Sectioned & {
    __typename?: 'Show';
    id: Scalars['ID'];
    title: Scalars['String'];
    synopsis?: Maybe<Scalars['String']>;
    rating?: Maybe<Rating>;
    genres: Array<Maybe<Collection>>;
    allGenres: Array<Tag>;
    primaryGenres: Array<Tag>;
    tileImage: Image;
    heroImage: Image;
    detailImage: Image;
    onMyList: Scalars['Boolean'];
    soundtrack?: Maybe<Album>;
    trailer?: Maybe<VodAsset>;
    characters: Array<Maybe<Character>>;
    type: ShowType;
    slots: Array<LinearSlot>;
    brands: Array<Maybe<Collection>>;
    year?: Maybe<Scalars['Int']>;
    /** @deprecated Field no longer supported */
    numberOfSeasons: Scalars['Int'];
    episodes: Array<Maybe<Episode>>;
    episodesPage: EpisodesPage;
    seasons: Array<Maybe<Season>>;
    season: Season;
    defaultSeason?: Maybe<Season>;
    defaultEpisode?: Maybe<Episode>;
    path: Scalars['URIPath'];
    section: Section;
  };

export type ShowTileImageArgs = {
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type ShowHeroImageArgs = {
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type ShowDetailImageArgs = {
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type ShowCharactersArgs = {
  limitTo?: Maybe<Scalars['Int']>;
};

export type ShowSlotsArgs = {
  preferLiveOnly?: Maybe<Scalars['Boolean']>;
  order?: Maybe<SlotOrder>;
};

export type ShowEpisodesArgs = {
  season?: Maybe<Scalars['ID']>;
  viewingContexts?: Maybe<Array<ViewingContext>>;
  includeTypes?: Maybe<Array<EpisodeType>>;
  sort?: Maybe<EpisodeSort>;
};

export type ShowEpisodesPageArgs = {
  season?: Maybe<Scalars['ID']>;
  viewingContexts?: Maybe<Array<ViewingContext>>;
  includeTypes?: Maybe<Array<EpisodeType>>;
  sort?: Maybe<EpisodeSort>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

export type ShowSeasonsArgs = {
  viewingContexts?: Maybe<Array<ViewingContext>>;
};

export type ShowSeasonArgs = {
  id: Scalars['ID'];
};

export type ShowDefaultSeasonArgs = {
  viewingContexts?: Maybe<Array<ViewingContext>>;
};

export enum ShowType {
  Series = 'SERIES',
  Sport = 'SPORT',
}

export type Season = {
  __typename?: 'Season';
  id: Scalars['ID'];
  /** @deprecated Field no longer supported */
  number: Scalars['Int'];
  episodes: Array<Maybe<Episode>>;
  episodesPage: EpisodesPage;
  soundtrack?: Maybe<Album>;
};

export type SeasonEpisodesArgs = {
  viewingContexts?: Maybe<Array<ViewingContext>>;
  includeTypes?: Maybe<Array<EpisodeType>>;
  sort?: Maybe<EpisodeSort>;
};

export type SeasonEpisodesPageArgs = {
  viewingContexts?: Maybe<Array<ViewingContext>>;
  includeTypes?: Maybe<Array<EpisodeType>>;
  sort?: Maybe<EpisodeSort>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

export enum EpisodeType {
  Regular = 'REGULAR',
  Highlight = 'HIGHLIGHT',
}

export type Episode = WebPage & {
  __typename?: 'Episode';
  id: Scalars['ID'];
  type: EpisodeType;
  title: Scalars['String'];
  synopsis?: Maybe<Scalars['String']>;
  rating?: Maybe<Rating>;
  image: Image;
  show: Show;
  season?: Maybe<Season>;
  duration?: Maybe<Scalars['Duration']>;
  number?: Maybe<Scalars['Int']>;
  watchProgress?: Maybe<WatchProgress>;
  asset?: Maybe<VodAsset>;
  path: Scalars['URIPath'];
  mySchedule?: Maybe<Schedule>;
  schedule?: Maybe<Schedule>;
  characters: Array<Maybe<Character>>;
  slots: Array<LinearSlot>;
};

export type EpisodeMyScheduleArgs = {
  viewingContexts?: Maybe<Array<ViewingContext>>;
};

export type EpisodeScheduleArgs = {
  viewingContexts?: Maybe<Array<ViewingContext>>;
};

export type EpisodeCharactersArgs = {
  limitTo?: Maybe<Scalars['Int']>;
};

export type Tag = {
  __typename?: 'Tag';
  title: Scalars['String'];
  collection?: Maybe<Collection>;
};

export type Movie = Title &
  WebPage &
  Sectioned & {
    __typename?: 'Movie';
    id: Scalars['ID'];
    title: Scalars['String'];
    synopsis?: Maybe<Scalars['String']>;
    rating?: Maybe<Rating>;
    genres: Array<Maybe<Collection>>;
    allGenres: Array<Tag>;
    primaryGenres: Array<Tag>;
    tileImage: Image;
    heroImage: Image;
    detailImage: Image;
    onMyList: Scalars['Boolean'];
    soundtrack?: Maybe<Album>;
    trailer?: Maybe<VodAsset>;
    characters: Array<Maybe<Character>>;
    slots: Array<LinearSlot>;
    brands: Array<Maybe<Collection>>;
    year?: Maybe<Scalars['Int']>;
    duration?: Maybe<Scalars['Duration']>;
    watchProgress?: Maybe<WatchProgress>;
    asset?: Maybe<VodAsset>;
    path: Scalars['URIPath'];
    section: Section;
    mySchedule?: Maybe<Schedule>;
    schedule?: Maybe<Schedule>;
  };

export type MovieTileImageArgs = {
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type MovieHeroImageArgs = {
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type MovieDetailImageArgs = {
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type MovieCharactersArgs = {
  limitTo?: Maybe<Scalars['Int']>;
};

export type MovieMyScheduleArgs = {
  viewingContexts?: Maybe<Array<ViewingContext>>;
};

export type MovieScheduleArgs = {
  viewingContexts?: Maybe<Array<ViewingContext>>;
};

export type PlaybackDevice = {
  platform: Scalars['String'];
  osVersion: Scalars['String'];
  drmType: DrmType;
  drmLevel?: Maybe<Scalars['String']>;
};

export type VodAsset = {
  __typename?: 'VodAsset';
  id: Scalars['ID'];
  rating: Rating;
  hasParentalRestriction: Scalars['Boolean'];
  duration: Scalars['Duration'];
};

export type WatchProgress = {
  __typename?: 'WatchProgress';
  complete: Scalars['Boolean'];
  lastWatched: Scalars['DateTime'];
  position: Scalars['Duration'];
};

export type Album = {
  __typename?: 'Album';
  id: Scalars['ID'];
  tracks: Array<Track>;
};

export type Artist = {
  __typename?: 'Artist';
  id: Scalars['ID'];
  name: Scalars['String'];
  spotifyUri: Scalars['URI'];
};

export type Track = {
  __typename?: 'Track';
  id: Scalars['ID'];
  name: Scalars['String'];
  number: Scalars['Int'];
  artists: Array<Artist>;
  spotifyUri: Scalars['URI'];
};

export type SearchResults = {
  __typename?: 'SearchResults';
  results: Array<Maybe<Title>>;
  groupResults: Array<Maybe<Group>>;
  groupResult?: Maybe<Group>;
};

export type SearchResultsGroupResultArgs = {
  id: Scalars['String'];
};

export type Group = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  layout: GroupLayout;
  content: Array<Maybe<GroupMember>>;
  contentPage: ContentPage;
};

export type GroupContentPageArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

export type EpisodesPage = {
  __typename?: 'EpisodesPage';
  pageInfo: PageInfo;
  content: Array<Maybe<Episode>>;
};

export type ContentPage = {
  __typename?: 'ContentPage';
  pageInfo: PageInfo;
  content: Array<Maybe<GroupMember>>;
};

export type LandscapeRailGroup = Group & {
  __typename?: 'LandscapeRailGroup';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  layout: GroupLayout;
  content: Array<Maybe<GroupMember>>;
  contentPage: ContentPage;
};

export type LandscapeRailGroupContentPageArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

export type PortraitRailGroup = Group & {
  __typename?: 'PortraitRailGroup';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  layout: GroupLayout;
  content: Array<Maybe<GroupMember>>;
  contentPage: ContentPage;
};

export type PortraitRailGroupContentPageArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

export type GridGroup = Group & {
  __typename?: 'GridGroup';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  layout: GroupLayout;
  content: Array<Maybe<GroupMember>>;
  contentPage: ContentPage;
};

export type GridGroupContentPageArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

export type ContinueWatchingGroup = Group & {
  __typename?: 'ContinueWatchingGroup';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  layout: GroupLayout;
  content: Array<Maybe<GroupMember>>;
  contentPage: ContentPage;
};

export type ContinueWatchingGroupContentPageArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

export type FavouriteAppsGroup = Group & {
  __typename?: 'FavouriteAppsGroup';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  layout: GroupLayout;
  presentation: AppsGroupPresentation;
  content: Array<Maybe<GroupMember>>;
  contentPage: ContentPage;
};

export type FavouriteAppsGroupContentPageArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

export enum AppsGroupPresentation {
  Small = 'SMALL',
  Large = 'LARGE',
}

export enum GroupLayout {
  RailLandscape = 'RAIL_LANDSCAPE',
  RailPortrait = 'RAIL_PORTRAIT',
  Grid = 'GRID',
  ContinueWatching = 'CONTINUE_WATCHING',
  FavouriteApps = 'FAVOURITE_APPS',
}

export type ContentFilter = {
  /** Return only content that is watchable by the current user. Defaults to false. */
  onlyMyContent?: Maybe<Scalars['Boolean']>;
  /**
   * Return only content of the specified type that is watchable in the given contexts. Defaults to
   * - SHOW_SERIES/MOVIE -> VOD + TVOD
   * - SHOW_SPORT -> linear
   * - CHANNEL -> linear
   *
   * If a content type is not specified it is not restricted.
   */
  viewingContextsByContentType?: Maybe<Array<ContentTypeViewingContext>>;
};

export type DefaultContentFilter = {
  __typename?: 'DefaultContentFilter';
  /** Return only content that is watchable by the current user. Defaults to false. */
  onlyMyContent?: Maybe<Scalars['Boolean']>;
  /**
   * Return only content of the specified type that is watchable in the given contexts. Defaults to
   * - SHOW_SERIES/MOVIE -> VOD + TVOD
   * - SHOW_SPORT -> linear
   * - CHANNEL -> linear
   *
   * If a content type is not specified it is not restricted.
   */
  viewingContextsByContentType: DefaultContentTypeViewingContext;
};

export type ContentTypeViewingContext = {
  contentTypes?: Maybe<Array<ContentType>>;
  viewingContexts: Array<ViewingContext>;
};

export type DefaultContentTypeViewingContext = {
  __typename?: 'DefaultContentTypeViewingContext';
  contentTypes?: Maybe<Array<ContentType>>;
  viewingContexts: Array<ViewingContext>;
};

export enum ContentType {
  /** @deprecated alias for SHOW_SERIES */
  Show = 'SHOW',
  /** A show of type SERIES */
  ShowSeries = 'SHOW_SERIES',
  /** A show of type SPORT */
  ShowSport = 'SHOW_SPORT',
  Movie = 'MOVIE',
  Channel = 'CHANNEL',
}

export type Collection = WebPage &
  Sectioned & {
    __typename?: 'Collection';
    id: Scalars['ID'];
    title: Scalars['String'];
    hero?: Maybe<HeroContent>;
    /** What sort/filter options are exposed to the end user, if any, for this collection */
    customerOptions: Array<Maybe<CollectionCustomerOption>>;
    defaultContentFilter: DefaultContentFilter;
    defaultContentSort?: Maybe<CollectionOrder>;
    content: Array<Maybe<CollectionMember>>;
    contentPage: CollectionContentPage;
    parent?: Maybe<Collection>;
    children: Array<Maybe<Collection>>;
    namedFilters: Array<NamedFilter>;
    tileImage: Image;
    logoImage: Image;
    path: Scalars['URIPath'];
    section: Section;
  };

export type CollectionContentArgs = {
  filter?: Maybe<ContentFilter>;
  namedFilters?: Maybe<Array<Scalars['ID']>>;
  sort?: Maybe<CollectionOrder>;
};

export type CollectionContentPageArgs = {
  filter?: Maybe<ContentFilter>;
  namedFilters?: Maybe<Array<Scalars['ID']>>;
  sort?: Maybe<CollectionOrder>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

export type CollectionTileImageArgs = {
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type CollectionLogoImageArgs = {
  aspectRatio?: Maybe<Scalars['Float']>;
};

export enum CollectionCustomerOption {
  FilterByOnlyMyContent = 'FILTER_BY_ONLY_MY_CONTENT',
  FilterByViewingContext = 'FILTER_BY_VIEWING_CONTEXT',
  Sort = 'SORT',
}

export type CollectionContentPage = {
  __typename?: 'CollectionContentPage';
  pageInfo?: Maybe<PageInfo>;
  content: Array<Maybe<CollectionMember>>;
};

export type NamedFilter = {
  __typename?: 'NamedFilter';
  id: Scalars['ID'];
  title: Scalars['String'];
};

export enum CollectionOrder {
  Newest = 'NEWEST',
  Alphabetical = 'ALPHABETICAL',
}

export type Section = {
  __typename?: 'Section';
  id: Scalars['ID'];
  title: Scalars['String'];
  home: SectionHome;
};

export type Sectioned = {
  section: Section;
};

export type Hero = {
  __typename?: 'Hero';
  heroList: Array<HeroContent>;
  displayTime: Scalars['Duration'];
};

export type ContentHome = WebPage &
  Sectioned & {
    __typename?: 'ContentHome';
    hero?: Maybe<HeroContent>;
    heroSet?: Maybe<Hero>;
    groups: Array<Maybe<Group>>;
    path: Scalars['URIPath'];
    section: Section;
  };

export type TvGuideHome = Sectioned &
  WebPage & {
    __typename?: 'TvGuideHome';
    path: Scalars['URIPath'];
    section: Section;
  };

export type BrowseHome = Sectioned &
  WebPage & {
    __typename?: 'BrowseHome';
    path: Scalars['URIPath'];
    section: Section;
    categories: Array<Maybe<Collection>>;
    /** The default category to show for a given viewing context, eg downloadable */
    category: Collection;
  };

export type BrowseHomeCategoriesArgs = {
  excludeViewingContexts?: Maybe<Array<ViewingContext>>;
};

export type BrowseHomeCategoryArgs = {
  viewingContexts: Array<ViewingContext>;
};

export type WebPage = {
  path: Scalars['URIPath'];
};

export type LinearChannelGroup = {
  __typename?: 'LinearChannelGroup';
  id: Scalars['ID'];
  title: Scalars['String'];
  channels: Array<Maybe<LinearChannel>>;
};

export type ChannelGroup = {
  __typename?: 'ChannelGroup';
  id: Scalars['ID'];
  title: Scalars['String'];
  channels: Array<Maybe<Channel>>;
};

export type AppPromotionChannel = {
  __typename?: 'AppPromotionChannel';
  id: Scalars['ID'];
  appId: Scalars['String'];
  title: Scalars['String'];
  number: Scalars['Int'];
  tileImage: Image;
  slotImage: Image;
  slotPromotionTitle: Scalars['String'];
  slotPromotionSubtitle?: Maybe<Scalars['String']>;
  partnership: Scalars['String'];
  promotionBackgroundImage: Image;
  promotionTitle: Scalars['String'];
  promotionSubtitle?: Maybe<Scalars['String']>;
};

export type AppPromotionChannelTileImageArgs = {
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type AppPromotionChannelSlotImageArgs = {
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type AppPromotionChannelPromotionBackgroundImageArgs = {
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type LinearChannel = WebPage & {
  __typename?: 'LinearChannel';
  id: Scalars['ID'];
  path: Scalars['URIPath'];
  tileImage: Image;
  title: Scalars['String'];
  number: Scalars['Int'];
  onMyList: Scalars['Boolean'];
  /**
   * A DVB triplet, identifies a Digital Video Broadcasting (DVB) service for channel tuning.
   * The schema of the triplet is: dvb://network_id.transport_id.service_id
   * Example value: dvb://5000.1.101
   */
  dvbTriplet?: Maybe<Scalars['URI']>;
  slots: Array<Maybe<LinearSlot>>;
  slotsForDay: LinearSlotsForDay;
  slot: LinearSlot;
  mySchedule?: Maybe<Schedule>;
  schedule?: Maybe<Schedule>;
};

export type LinearChannelTileImageArgs = {
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type LinearChannelSlotsArgs = {
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
  next?: Maybe<Scalars['Int']>;
};

export type LinearChannelSlotsForDayArgs = {
  timezone?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['LocalDate']>;
};

export type LinearChannelSlotArgs = {
  at?: Maybe<Scalars['DateTime']>;
  offset?: Maybe<Scalars['Int']>;
};

export type LinearSlotsForDay = {
  __typename?: 'LinearSlotsForDay';
  date: Scalars['LocalDate'];
  timezone: Scalars['String'];
  slots: Array<Maybe<LinearSlot>>;
};

export type LinearSlot = {
  __typename?: 'LinearSlot';
  id: Scalars['ID'];
  channel: LinearChannel;
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
  rating?: Maybe<Rating>;
  hasParentalRestriction: Scalars['Boolean'];
  recordOptions: Array<Maybe<RecordType>>;
  programme?: Maybe<LinearContent>;
  /**
   * Whether this slot contains a live broadcast. This flag will be true even
   * if the slot is in the future or past: it represents whether the content was/will be
   * live at the time the slot is current
   */
  live: Scalars['Boolean'];
  /**
   * How long in the past this slot can be played from the live buffer, may be zero
   * if playback from the buffer is not permitted.
   */
  reverseEpgWindow: Scalars['Duration'];
  /** Whether playback from the beginning of the slot from the live buffer is permitted. */
  allowPlayFromStart: Scalars['Boolean'];
  /** If present, then this slot contains content that requires a specific purchase to view. */
  payPerViewOffer?: Maybe<CustomerPayPerViewOffer>;
};

export type CustomerPayPerViewOffer = {
  __typename?: 'CustomerPayPerViewOffer';
  id: Scalars['ID'];
  price: MonetaryAmount;
  purchases: Array<CustomerLinearPayPerViewPurchase>;
  slots: Array<LinearSlot>;
};

export type CustomerLinearPayPerViewPurchase = {
  __typename?: 'CustomerLinearPayPerViewPurchase';
  purchasedAt: Scalars['DateTime'];
  offer: CustomerPayPerViewOffer;
  /** The device this purchase is tied to, if any */
  deviceId?: Maybe<Scalars['ID']>;
};

export enum EpisodeSort {
  /**
   * # Sort by season/episode number, descendig (S2E9, ... S1E2, S1E1
   * @Deprecated renamed to LATEST
   */
  EpisodeNumberDescending = 'EPISODE_NUMBER_DESCENDING',
  Earliest = 'EARLIEST',
  Latest = 'LATEST',
}

export enum SlotOrder {
  /**
   * Episodes can air out of order, particular if repeat airings are involved.
   * This will return slots in the natural order of the programmes they contain
   * eg S1E1, S1E2, S1E1, S2E1, reglardess of the slot date.
   */
  EarliestProgramme = 'EARLIEST_PROGRAMME',
  /** Order by slot start time, eg 1pm, 2pm, 3pm */
  EarliestSlot = 'EARLIEST_SLOT',
}

export type LinearPlaybackResponse =
  | LinearPlaybackSources
  | ConcurrentStreamsExceeded
  | SubscriptionNeeded
  | Geoblocked
  | PayPerViewPurchaseMissing;

export type VodPlaybackResponse =
  | VodPlaybackSources
  | ConcurrentStreamsExceeded
  | SubscriptionNeeded
  | Geoblocked
  | PlaybackNotAllowed
  | TvodPurchaseMissing
  | TvodPurchaseExpired
  | TvodPurchaseForDifferentDevice;

/**
 * Playback is not permitted for title on this device/OS. Currently only applies to Disney content with specific
 * rules that block playback, eg Disney does not allow playback on Windows < 7 SP1.
 *
 * Ideally this response would be extended to indicate what rule is actually preventing playback in a structured way, currently this type is overly generic.
 */
export type PlaybackNotAllowed = {
  __typename?: 'PlaybackNotAllowed';
  message: Scalars['String'];
};

export type ConcurrentStreamsExceeded = {
  __typename?: 'ConcurrentStreamsExceeded';
  streamLimit: Scalars['Int'];
};

export type Geoblocked = {
  __typename?: 'Geoblocked';
  countryCode: Scalars['String'];
};

export type SubscriptionNeeded = {
  __typename?: 'SubscriptionNeeded';
  /** Any one of these subscriptions is required, not all */
  subscriptions: Array<Maybe<SkySubscription>>;
};

/** A pay-per-view purchase is required for playback, but missing for this customer. */
export type PayPerViewPurchaseMissing = {
  __typename?: 'PayPerViewPurchaseMissing';
  offer: CustomerPayPerViewOffer;
};

/** A TVOD purchase is required for playback, but missing for this customer. */
export type TvodPurchaseMissing = {
  __typename?: 'TvodPurchaseMissing';
  offer: CustomerTvodOffer;
};

/** A TVOD purchase is required for playback, but this customer's purchase has expired. */
export type TvodPurchaseExpired = {
  __typename?: 'TvodPurchaseExpired';
  purchase: CustomerTvodPurchase;
};

/** A TVOD purchase is required for playback, but this customer's purchase is bound to a different device. */
export type TvodPurchaseForDifferentDevice = {
  __typename?: 'TvodPurchaseForDifferentDevice';
  purchases: Array<CustomerTvodPurchase>;
};

export type PlaybackHeartbeatResponse = {
  __typename?: 'PlaybackHeartbeatResponse';
  timeToNextHeartbeat: Scalars['Duration'];
};

export type PlaybackSources = {
  playbackSource: PlaybackSource;
  timeToNextHeartbeat: Scalars['Duration'];
};

export type PlaybackSourcesPlaybackSourceArgs = {
  drmType: DrmType;
};

export type LinearPlaybackSources = PlaybackSources & {
  __typename?: 'LinearPlaybackSources';
  playbackSource: PlaybackSource;
  timeToNextHeartbeat: Scalars['Duration'];
  streamUri: Scalars['URI'];
  drmLicense: PlaybackDrmLicense;
};

export type LinearPlaybackSourcesPlaybackSourceArgs = {
  drmType: DrmType;
};

export type LinearPlaybackSourcesStreamUriArgs = {
  drmType: DrmType;
};

export type LinearPlaybackSourcesDrmLicenseArgs = {
  drmType: DrmType;
};

export type VodPlaybackSources = PlaybackSources & {
  __typename?: 'VodPlaybackSources';
  playbackSource: PlaybackSource;
  timeToNextHeartbeat: Scalars['Duration'];
  brightcovePlaybackV1: Scalars['JSON'];
};

export type VodPlaybackSourcesPlaybackSourceArgs = {
  drmType: DrmType;
};

export type PlaybackSource = {
  __typename?: 'PlaybackSource';
  streamUri: Scalars['URI'];
  drmLicense: PlaybackDrmLicense;
  emeHeaders: Array<EmeHeader>;
};

export type EmeHeader = {
  __typename?: 'EmeHeader';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type PlaybackDrmLicense = {
  licenseUri: Scalars['URI'];
};

export type PlayreadyLicense = PlaybackDrmLicense & {
  __typename?: 'PlayreadyLicense';
  licenseUri: Scalars['URI'];
};

export type WidevineLicense = PlaybackDrmLicense & {
  __typename?: 'WidevineLicense';
  licenseUri: Scalars['URI'];
};

export type FairplayLicense = PlaybackDrmLicense & {
  __typename?: 'FairplayLicense';
  licenseUri: Scalars['URI'];
  certificateUri: Scalars['URI'];
};

export enum DrmType {
  Widevine = 'WIDEVINE',
  Playready = 'PLAYREADY',
  Fairplay = 'FAIRPLAY',
}

export type DeviceRegistrationLimitExceeded = {
  __typename?: 'DeviceRegistrationLimitExceeded';
  maxDeviceLimit: Scalars['Int'];
};

export type DeviceDeactivationLimitExceeded = {
  __typename?: 'DeviceDeactivationLimitExceeded';
  maxDeviceLimit: Scalars['Int'];
};

export enum DeviceFamily {
  Handset = 'HANDSET',
  Tablet = 'TABLET',
  Tv = 'TV',
  Browser = 'BROWSER',
  Unknown = 'UNKNOWN',
}

export type RegisterDeviceInput = {
  deviceId: Scalars['ID'];
  model?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  family?: Maybe<DeviceFamily>;
};

export type Device = {
  __typename?: 'Device';
  deviceId: Scalars['ID'];
  model?: Maybe<Scalars['String']>;
  family?: Maybe<DeviceFamily>;
  name?: Maybe<Scalars['String']>;
  active: Scalars['Boolean'];
  registeredOn: Scalars['DateTime'];
  lastUsed: Scalars['DateTime'];
};

export type GenericDeviceResponse = {
  __typename?: 'GenericDeviceResponse';
  message?: Maybe<Scalars['String']>;
};

/** @Deprecated, split into CustomerAccount and CustomerProfile */
export type SkyDecoderActivationResponse =
  | SkyDecoderActivationSuccess
  | SkyDecoderAlreadyActivated
  | SkyDecoderAccountMismatch
  | SkyDecoderNotFound
  | SkyAccountNotLinked;

export type SkyDecoderActivationSuccess = {
  __typename?: 'SkyDecoderActivationSuccess';
  message?: Maybe<Scalars['String']>;
};

export type SkyDecoderAlreadyActivated = {
  __typename?: 'SkyDecoderAlreadyActivated';
  message?: Maybe<Scalars['String']>;
};

export type SkyAccountNotLinked = {
  __typename?: 'SkyAccountNotLinked';
  message?: Maybe<Scalars['String']>;
};

export type SkyDecoderAccountMismatch = {
  __typename?: 'SkyDecoderAccountMismatch';
  message?: Maybe<Scalars['String']>;
};

export type SkyDecoderNotFound = {
  __typename?: 'SkyDecoderNotFound';
  message?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  subscriptions: Array<SkySubscription>;
  parentalSettings: ParentalSettings;
  devices: Array<Device>;
  decoders: Array<SkyDecoderBox>;
  attributes: Array<UserAttributes>;
};

export type UserDevicesArgs = {
  includeInactive?: Maybe<Scalars['Boolean']>;
};

export type CustomerAccount = {
  __typename?: 'CustomerAccount';
  id: Scalars['ID'];
  tier: CustomerAccountTier;
  subscriptions: Array<SkySubscription>;
  devices: Array<Device>;
  decoders: Array<SkyDecoderBox>;
  decoder: SkyDecoderBox;
  parentalSettings: ParentalSettings;
  attributes: Array<CustomerAccountAttribute>;
  /** Never returns an empty list */
  profiles: Array<CustomerProfile>;
  /** Return a specific profile by ID, or the default profile if no ID is specified. */
  profile?: Maybe<CustomerProfile>;
  purchases: Array<CustomerPurchase>;
  tvodPurchases: Array<CustomerTvodPurchase>;
  payPerViewPurchases: Array<CustomerLinearPayPerViewPurchase>;
  notifications: Array<CustomerNotification>;
};

export type CustomerAccountDevicesArgs = {
  includeInactive?: Maybe<Scalars['Boolean']>;
};

export type CustomerAccountDecoderArgs = {
  id: Scalars['ID'];
};

export type CustomerAccountProfileArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type CustomerAccountPurchasesArgs = {
  includeExpired?: Maybe<Scalars['Boolean']>;
};

export type CustomerAccountTvodPurchasesArgs = {
  includeExpired?: Maybe<Scalars['Boolean']>;
};

export type CustomerAccountPayPerViewPurchasesArgs = {
  includeExpired?: Maybe<Scalars['Boolean']>;
};

export type CustomerAccountNotificationsArgs = {
  includeConsumed?: Scalars['Boolean'];
};

export type TvodContent = Movie;

export type CustomerPurchase = CustomerTvodPurchase | CustomerLinearPayPerViewPurchase;

export type CustomerAccountTier = {
  /** Dummy field to avoid empty type limitation of GraphQL */
  _?: Maybe<Scalars['Void']>;
};

export type FreeCustomerAccountTier = CustomerAccountTier & {
  __typename?: 'FreeCustomerAccountTier';
  _?: Maybe<Scalars['Void']>;
};

export type SkyCustomerAccountTier = CustomerAccountTier & {
  __typename?: 'SkyCustomerAccountTier';
  status: SkyCustomerAccountStatus;
  accountNumber: Scalars['ID'];
  houseNumbers: Array<Scalars['ID']>;
  _?: Maybe<Scalars['Void']>;
};

export enum SkyCustomerAccountStatus {
  Active = 'ACTIVE',
  Suspended = 'SUSPENDED',
  Former = 'FORMER',
}

export type CreateCustomerProfileResponse = CustomerProfile | ProfilesLimitExceeded;

export type CustomerProfile = {
  __typename?: 'CustomerProfile';
  id: Scalars['ID'];
  name: Scalars['String'];
  customerProfileAvatar: CustomerProfileAvatar;
  isDefault: Scalars['Boolean'];
  notifications: Array<CustomerProfileNotification>;
};

export type CustomerProfileNotificationsArgs = {
  includeConsumed?: Scalars['Boolean'];
};

export type ProfilesLimitExceeded = {
  __typename?: 'ProfilesLimitExceeded';
  maxProfiles: Scalars['Int'];
};

export type CustomerProfileAvatar = {
  __typename?: 'CustomerProfileAvatar';
  id: Scalars['ID'];
  image: Image;
};

export type CustomerProfileAvatarGroup = {
  __typename?: 'CustomerProfileAvatarGroup';
  id: Scalars['ID'];
  title: Scalars['String'];
  customerProfileAvatars: Array<Maybe<CustomerProfileAvatar>>;
};

export type CustomerNotification = {
  id: Scalars['ID'];
  /** When the notification was triggered */
  sentAt: Scalars['DateTime'];
  /**
   * A "consumed" notification is one that has been marked as actioned or read by a profile,
   * and is retained only for traceability, potentially only for a limited amount of time.
   */
  consumed: Scalars['Boolean'];
  consumedAt?: Maybe<Scalars['DateTime']>;
};

export type CustomerProfileNotification = {
  profile: CustomerProfile;
};

export type DeviceNotification = {
  device: SkyDevice;
};

/**
 * An instruction to schedule a recording for a specific slot (single episode or
 * a movie) on a specific box
 */
export type RemoteRecordSlotCommand = CustomerNotification &
  CustomerProfileNotification &
  DeviceNotification & {
    __typename?: 'RemoteRecordSlotCommand';
    id: Scalars['ID'];
    profile: CustomerProfile;
    consumed: Scalars['Boolean'];
    consumedAt?: Maybe<Scalars['DateTime']>;
    sentAt: Scalars['DateTime'];
    /** The box the record command was issued to */
    device: SkyDevice;
    /** The slot to record */
    slot: LinearSlot;
  };

/**
 * An instruction to schedule an ongoing recording for all new episodes of a show
 * on a specific box
 */
export type RemoteRecordShowCommand = CustomerNotification &
  CustomerProfileNotification &
  DeviceNotification & {
    __typename?: 'RemoteRecordShowCommand';
    id: Scalars['ID'];
    profile: CustomerProfile;
    consumed: Scalars['Boolean'];
    consumedAt?: Maybe<Scalars['DateTime']>;
    sentAt: Scalars['DateTime'];
    /** The box the record command was issued to */
    device: SkyDevice;
    /** The show to record */
    show: Show;
  };

export type BoxApp = {
  __typename?: 'BoxApp';
  id: Scalars['ID'];
  favourite: Scalars['Boolean'];
  canUnfavourite: Scalars['Boolean'];
  mandatory: Scalars['Boolean'];
  lastOpened?: Maybe<Scalars['DateTime']>;
  suggestedTileImage?: Maybe<Image>;
};

export type BoxAppSuggestedTileImageArgs = {
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type UserAttributes = {
  __typename?: 'UserAttributes';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type CustomerAccountAttribute = {
  __typename?: 'CustomerAccountAttribute';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type ParentalSettings = {
  __typename?: 'ParentalSettings';
  parentalControlEnabled: Scalars['Boolean'];
  parentalControl: ParentalControl;
  approvedClassification: Classification;
  pinValidationStatus?: Maybe<PinValidationFailure>;
};

export enum ParentalControl {
  Enabled = 'ENABLED',
  Disabled = 'DISABLED',
  NotSet = 'NOT_SET',
}

export type RegisterDeviceResponse = Device | DeviceRegistrationLimitExceeded;

export type DeactivateDeviceResponse = GenericDeviceResponse | DeviceDeactivationLimitExceeded;

export type SkyDecoderBox = SkyDevice & {
  __typename?: 'SkyDecoderBox';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  recordCapable: Scalars['Boolean'];
  notifications: Array<DeviceNotification>;
};

export type SkyDecoderBoxNotificationsArgs = {
  includeConsumed?: Scalars['Boolean'];
};

export type SkyDevice = {
  id: Scalars['ID'];
  notifications: Array<DeviceNotification>;
};

export type SkyDeviceNotificationsArgs = {
  includeConsumed?: Scalars['Boolean'];
};

export enum RecordType {
  Episode = 'EPISODE',
  Series = 'SERIES',
}

export type RecordInput = {
  channelId: Scalars['ID'];
  startTime: Scalars['DateTime'];
  skyDecoderBoxId: Scalars['ID'];
  recordSeries: Scalars['Boolean'];
};

export type PinValidationResponse = PinValidationResult | PinValidationFailure;

export type PinValidationResult = {
  __typename?: 'PinValidationResult';
  remainingAttempts: Scalars['Int'];
  isValid: Scalars['Boolean'];
};

export type PinValidationFailure = {
  __typename?: 'PinValidationFailure';
  attempts: Scalars['Int'];
  timeoutEnd: Scalars['DateTime'];
};

export type Character = {
  __typename?: 'Character';
  /**
   * @deprecated
   * Character names are going to be removed from MAC, in the meantime
   * this will always return an empty string for character name.
   * Eventually this type will be replaced with a more generic credit/role model.
   */
  characterName: Scalars['String'];
  actorName: Scalars['String'];
};

export type PurchaseTvodResponse =
  | CustomerTvodPurchase
  | InvalidCustomerAccountForPurchase
  | CustomerTvodDuplicatePurchaseError;

export type PurchasePayPerViewResponse =
  | CustomerLinearPayPerViewPurchase
  | InvalidCustomerAccountForPurchase
  | CustomerPayPerViewDuplicatePurchaseError;

export type CustomerTvodPurchase = {
  __typename?: 'CustomerTvodPurchase';
  purchasedAt: Scalars['DateTime'];
  offer: CustomerTvodOffer;
  /** The device this purchase is tied to, if any */
  deviceId?: Maybe<Scalars['ID']>;
};

export type InvalidCustomerAccountForPurchase = {
  __typename?: 'InvalidCustomerAccountForPurchase';
  /** Not intended for display. */
  reason: Scalars['String'];
  tier?: Maybe<CustomerAccountTier>;
};

export type CustomerTvodDuplicatePurchaseError = {
  __typename?: 'CustomerTvodDuplicatePurchaseError';
  existingPurchase: CustomerTvodPurchase;
};

export type CustomerPayPerViewDuplicatePurchaseError = {
  __typename?: 'CustomerPayPerViewDuplicatePurchaseError';
  existingPurchase: CustomerLinearPayPerViewPurchase;
};

export type CustomerTvodOffer = {
  __typename?: 'CustomerTvodOffer';
  id: Scalars['ID'];
  price: MonetaryAmount;
  startingPeriod: Scalars['Duration'];
  rentalPeriod: Scalars['Duration'];
  /** @deprecated Field no longer supported */
  expressRelease: Scalars['Boolean'];
  /**
   * Returns any active, non-expired purchase of this offer.
   * @Deprecated, use purchases
   */
  purchase?: Maybe<CustomerTvodPurchase>;
  /** Returns purchases of this offer by this customer, if any. */
  purchases: Array<CustomerTvodPurchase>;
  content: TvodContent;
  schedule: Schedule;
};

export type CustomerTvodOfferPurchasesArgs = {
  includeExpired?: Maybe<Scalars['Boolean']>;
};

export type Schedule = {
  __typename?: 'Schedule';
  dateRange: DateRange;
  subscriptions: Array<Maybe<SkySubscription>>;
  tvodOffer?: Maybe<CustomerTvodOffer>;
};

export type ImageRenditionSet = {
  __typename?: 'ImageRenditionSet';
  image: Image;
  images: Array<Image>;
};

export type ImageRenditionSetImageArgs = {
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type Image = {
  __typename?: 'Image';
  uri: Scalars['URI'];
};

export type Rating = {
  __typename?: 'Rating';
  classification: Classification;
  advisories: Array<AudienceAdvisory>;
};

export enum Classification {
  G = '_G',
  Pg = '_PG',
  M = '_M',
  _16 = '_16',
  _18 = '_18',
}

export enum AudienceAdvisory {
  C = 'C',
  L = 'L',
  V = 'V',
  S = 'S',
}

export type MonetaryAmount = {
  __typename?: 'MonetaryAmount';
  amount: Scalars['Decimal'];
  currency: Scalars['CurrencyCode'];
};

export type SkySubscription = {
  __typename?: 'SkySubscription';
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type DateRange = {
  __typename?: 'DateRange';
  start: Scalars['DateTime'];
  end?: Maybe<Scalars['DateTime']>;
};

export enum ViewingContext {
  Vod = 'VOD',
  Catchup = 'CATCHUP',
  Download = 'DOWNLOAD',
  Tvod = 'TVOD',
  Linear = 'LINEAR',
  PayPerView = 'PAY_PER_VIEW',
}

export type PageInfo = {
  __typename?: 'PageInfo';
  startCursor?: Maybe<Scalars['ID']>;
  endCursor?: Maybe<Scalars['ID']>;
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
};

export enum ProductCode {
  Neon = 'NEON',
  SkyBox = 'SKY_BOX',
  SkyPod = 'SKY_POD',
  SkyGo = 'SKY_GO',
}

export type CatalogCredit = {
  __typename?: 'CatalogCredit';
  person: CatalogPerson;
  role: CatalogCreditRole;
};

export enum CatalogCreditRole {
  Actor = 'ACTOR',
  Contestant = 'CONTESTANT',
  Director = 'DIRECTOR',
  ExecutiveProducer = 'EXECUTIVE_PRODUCER',
  Host = 'HOST',
  Judge = 'JUDGE',
  Narrator = 'NARRATOR',
  Producer = 'PRODUCER',
  Self = 'SELF',
  Voice = 'VOICE',
}

export type CatalogPerson = {
  __typename?: 'CatalogPerson';
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  /** Combined first/last name */
  name: Scalars['String'];
};
