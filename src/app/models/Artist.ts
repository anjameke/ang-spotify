import { Album } from './Album';
import { Image } from './Image';

export class Artist {
    id: string;
    name: string;
    genres: any;
    albums: Album[];
    uri: string;
    href: string;
    images: Array<Image>;
    popularity: number;
    type: string;
    external_urls: any;
    followers: any;
}