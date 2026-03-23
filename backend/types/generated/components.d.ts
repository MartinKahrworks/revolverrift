import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsActionButton extends Struct.ComponentSchema {
  collectionName: 'components_elements_action_buttons';
  info: {
    description: 'Dynamic button with text, link and icon.';
    displayName: 'action-button';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files'>;
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

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

export interface ElementsProductBadge extends Struct.ComponentSchema {
  collectionName: 'components_elements_product_badges';
  info: {
    description: 'A small label/tag shown on a product card (e.g. NEW, SALE, LIMITED)';
    displayName: 'product-badge';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<
      ['gold', 'red', 'green', 'silver', 'dark']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'gold'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsProductVariant extends Struct.ComponentSchema {
  collectionName: 'components_elements_product_variants';
  info: {
    description: 'A purchasable variant of a product (e.g. size S, color Black)';
    displayName: 'product-variant';
  };
  attributes: {
    is_available: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    price_modifier: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    sku_suffix: Schema.Attribute.String;
    stock_quantity: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    variant_label: Schema.Attribute.String & Schema.Attribute.Required;
    variant_type: Schema.Attribute.Enumeration<
      ['size', 'color', 'edition', 'bundle']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'size'>;
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

export interface SectionsApplicationStep extends Struct.ComponentSchema {
  collectionName: 'components_sections_application_steps';
  info: {
    description: 'A single step in the partner application process';
    displayName: 'application-step';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    stepNumber: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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
    action_buttons: Schema.Attribute.Component<'elements.action-button', true>;
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

export interface SectionsPartnerPerk extends Struct.ComponentSchema {
  collectionName: 'components_sections_partner_perks';
  info: {
    description: 'A single perk for a partner tier';
    displayName: 'partner-perk';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsPartnerStage extends Struct.ComponentSchema {
  collectionName: 'components_sections_partner_stages';
  info: {
    description: 'A single partnership stage/tier with structured perks';
    displayName: 'partner-stage';
  };
  attributes: {
    perks: Schema.Attribute.Component<'sections.partner-perk', true>;
    requirement: Schema.Attribute.Text;
    stageNumber: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsPromoBanner extends Struct.ComponentSchema {
  collectionName: 'components_sections_promo_banners';
  info: {
    description: 'A promotional banner strip shown at the top of the shop page';
    displayName: 'promo-banner';
  };
  attributes: {
    background_color: Schema.Attribute.Enumeration<
      ['gold', 'dark', 'red', 'transparent']
    > &
      Schema.Attribute.DefaultTo<'gold'>;
    cta_link: Schema.Attribute.String;
    cta_text: Schema.Attribute.String;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    message: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface SharedFormField extends Struct.ComponentSchema {
  collectionName: 'components_shared_form_fields';
  info: {
    description: 'Dynamic form field for contact pages';
    displayName: 'form-field';
  };
  attributes: {
    inputType: Schema.Attribute.Enumeration<
      ['text', 'email', 'textarea', 'number', 'tel']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'text'>;
    isRequired: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    placeholder: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'A single social or generic link for the footer grid';
    displayName: 'social-link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images' | 'files'>;
    isImprintModal: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.action-button': ElementsActionButton;
      'elements.feature-item': ElementsFeatureItem;
      'elements.product-badge': ElementsProductBadge;
      'elements.product-variant': ElementsProductVariant;
      'elements.statistic-item': ElementsStatisticItem;
      'sections.about-section': SectionsAboutSection;
      'sections.application-step': SectionsApplicationStep;
      'sections.features-section': SectionsFeaturesSection;
      'sections.hero-section': SectionsHeroSection;
      'sections.lore-section': SectionsLoreSection;
      'sections.partner-logo': SectionsPartnerLogo;
      'sections.partner-perk': SectionsPartnerPerk;
      'sections.partner-stage': SectionsPartnerStage;
      'sections.promo-banner': SectionsPromoBanner;
      'sections.trailer-section': SectionsTrailerSection;
      'shared.form-field': SharedFormField;
      'shared.social-link': SharedSocialLink;
    }
  }
}
