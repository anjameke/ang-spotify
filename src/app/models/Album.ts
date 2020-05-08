import { Artist } from './Artist';
import { Image } from './Image';

export class Album {
    id: string;
    album_type: string
    artists: Array<Artist>;
    external_ids: any;
    external_urls: any
    genres: Array<string>;
    href: string;
    images: Array<Image>;
    label: string;
    name: string;
    release_date: string;
    uri: string;
    type: string;
}