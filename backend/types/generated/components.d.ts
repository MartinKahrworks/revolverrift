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
    cinematic_slider: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsLoreSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_lore_sections';
  info: {
    displayName: 'lore-section';
  };
  attributes: {
    align_text: Schema.Attribute.Enumeration<['left', 'right', 'center']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'right'>;
    background_image: Schema.Attribute.Media<'images'>;
    bg_position: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'center center'>;
    body: Schema.Attribute.Blocks & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsPartnerLogo extends Struct.ComponentSchema {
  collectionName: 'components_sections_partner_logos';
  info: {
    description: 'A logo for a partner brand or creator';
    displayName: 'partner-logo';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsPartnerStage extends Struct.ComponentSchema {
  collectionName: 'components_sections_partner_stages';
  info: {
    description: 'A single partnership stage/tier';
    displayName: 'partner-stage';
  };
  attributes: {
    benefits: Schema.Attribute.Blocks & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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
      'sections.lore-section': SectionsLoreSection;
      'sections.partner-logo': SectionsPartnerLogo;
      'sections.partner-stage': SectionsPartnerStage;
      'sections.trailer-section': SectionsTrailerSection;
    }
  }
}
