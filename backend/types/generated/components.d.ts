import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_feature_items';
  info: {
    displayName: 'feature-item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsStatisticItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_statistic_items';
  info: {
    displayName: 'statistic-item';
  };
  attributes: {
    label: Schema.Attribute.String;
    number: Schema.Attribute.Integer;
  };
}

export interface SectionsAboutSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_sections';
  info: {
    displayName: 'about-section';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    statistics: Schema.Attribute.Component<'elements.statistic-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsFeaturesSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_features_sections';
  info: {
    displayName: 'features_section';
  };
  attributes: {
    features: Schema.Attribute.Component<'elements.feature-item', true>;
    section_title: Schema.Attribute.String;
  };
}

export interface SectionsHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_sections';
  info: {
    displayName: 'hero-section';
  };
  attributes: {
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    button_link: Schema.Attribute.String;
    button_text: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTrailerSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_trailer_sections';
  info: {
    displayName: 'trailer-section';
  };
  attributes: {
    thumbnail: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    video_url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.feature-item': ElementsFeatureItem;
      'elements.statistic-item': ElementsStatisticItem;
      'sections.about-section': SectionsAboutSection;
      'sections.features-section': SectionsFeaturesSection;
      'sections.hero-section': SectionsHeroSection;
      'sections.trailer-section': SectionsTrailerSection;
    }
  }
}
