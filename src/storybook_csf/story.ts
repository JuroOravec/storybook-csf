// This is a copy of the types from ComponentDriven/csf, the source of the CSF spec.
// https://github.com/ComponentDriven/csf/blob/b832db2a0bb4cc4fd9d4ddd9b8159d7611afba79/src/story.ts
//
// This copy was modified to remove those fields that cannot be represented as JSON.
// Thus, these types can be used with Storybook for Server.
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/server-webpack5

interface SBBaseType {
    required?: boolean;
    raw?: string;
}

export type SBScalarType = SBBaseType & {
    name: 'boolean' | 'string' | 'number' | 'function' | 'symbol';
};

export type SBArrayType = SBBaseType & {
    name: 'array';
    value: SBType;
};
export type SBObjectType = SBBaseType & {
    name: 'object';
    value: Record<string, SBType>;
};
export type SBEnumType = SBBaseType & {
    name: 'enum';
    value: (string | number)[];
};
export type SBIntersectionType = SBBaseType & {
    name: 'intersection';
    value: SBType[];
};
export type SBUnionType = SBBaseType & {
    name: 'union';
    value: SBType[];
};
export type SBOtherType = SBBaseType & {
    name: 'other';
    value: string;
};

export type SBType =
    | SBScalarType
    | SBEnumType
    | SBArrayType
    | SBObjectType
    | SBIntersectionType
    | SBUnionType
    | SBOtherType;

export type StoryId = string;
export type ComponentId = string;
export type ComponentTitle = string;
export type StoryName = string;

export type Tag = string;

export interface StoryIdentifier {
  componentId: ComponentId;
  title: ComponentTitle;
  /** @deprecated */
  kind: ComponentTitle;

  id: StoryId;
  name: StoryName;
  /** @deprecated */
  story: StoryName;

  tags: Tag[];
}

export interface Parameters {
  [name: string]: any;
}

type ControlType =
  | 'object'
  | 'boolean'
  | 'check'
  | 'inline-check'
  | 'radio'
  | 'inline-radio'
  | 'select'
  | 'multi-select'
  | 'number'
  | 'range'
  | 'file'
  | 'color'
  | 'date'
  | 'text';

type ConditionalTest = { truthy?: boolean } | { exists: boolean } | { eq: any } | { neq: any };
type ConditionalValue = { arg: string } | { global: string };
export type Conditional = ConditionalValue & ConditionalTest;

interface ControlBase {
  [key: string]: any;
  /** @see https://storybook.js.org/docs/api/arg-types#controltype */
  type?: ControlType;
  disable?: boolean;
}

type Control =
  | ControlType
  | false
  | (ControlBase &
      (
        | ControlBase
        | {
            type: 'color';
            /** @see https://storybook.js.org/docs/api/arg-types#controlpresetcolors */
            presetColors?: string[];
          }
        | {
            type: 'file';
            /** @see https://storybook.js.org/docs/api/arg-types#controlaccept */
            accept?: string;
          }
        | {
            type: 'inline-check' | 'radio' | 'inline-radio' | 'select' | 'multi-select';
            /** @see https://storybook.js.org/docs/api/arg-types#controllabels */
            labels?: { [options: string]: string };
          }
        | {
            type: 'number' | 'range';
            /** @see https://storybook.js.org/docs/api/arg-types#controlmax */
            max?: number;
            /** @see https://storybook.js.org/docs/api/arg-types#controlmin */
            min?: number;
            /** @see https://storybook.js.org/docs/api/arg-types#controlstep */
            step?: number;
          }
      ));

export interface InputType {
  /** @see https://storybook.js.org/docs/api/arg-types#control */
  control?: Control;
  /** @see https://storybook.js.org/docs/api/arg-types#description */
  description?: string;
  /** @see https://storybook.js.org/docs/api/arg-types#if */
  if?: Conditional;
  /** @see https://storybook.js.org/docs/api/arg-types#mapping */
  mapping?: { [key: string]: any };
  /** @see https://storybook.js.org/docs/api/arg-types#name */
  name?: string;
  /** @see https://storybook.js.org/docs/api/arg-types#options */
  options?: readonly any[];
  /** @see https://storybook.js.org/docs/api/arg-types#table */
  table?: {
    [key: string]: unknown;
    /** @see https://storybook.js.org/docs/api/arg-types#tablecategory */
    category?: string;
    /** @see https://storybook.js.org/docs/api/arg-types#tabledefaultvalue */
    defaultValue?: { summary?: string; detail?: string };
    /** @see https://storybook.js.org/docs/api/arg-types#tabledisable */
    disable?: boolean;
    /** @see https://storybook.js.org/docs/api/arg-types#tablesubcategory */
    subcategory?: string;
    /** @see https://storybook.js.org/docs/api/arg-types#tabletype */
    type?: { summary?: string; detail?: string };
  };
  /** @see https://storybook.js.org/docs/api/arg-types#type */
  type?: SBType | SBScalarType['name'];
  /**
   * @deprecated Use `table.defaultValue.summary` instead.
   * @see https://storybook.js.org/docs/api/arg-types#defaultvalue
   */
  defaultValue?: any;
  [key: string]: any;
}

export interface Args {
  [name: string]: any;
}

/** @see https://storybook.js.org/docs/api/arg-types#argtypes */
export type ArgTypes<TArgs = Args> = { [name in keyof TArgs]: InputType };

export interface Globals {
  [name: string]: any;
}
export interface GlobalTypes {
  [name: string]: InputType;
}

export interface BaseAnnotations<TArgs = Args> {
  /**
   * Custom metadata for a story.
   *
   * @see [Parameters](https://storybook.js.org/docs/writing-stories/parameters)
   */
  parameters?: Parameters;

  /**
   * Dynamic data that are provided (and possibly updated by) Storybook and its addons.
   *
   * @see [Args](https://storybook.js.org/docs/writing-stories/args)
   */
  args?: Partial<TArgs>;

  /**
   * ArgTypes encode basic metadata for args, such as `name`, `description`, `defaultValue` for an
   * arg. These get automatically filled in by Storybook Docs.
   *
   * @see [ArgTypes](https://storybook.js.org/docs/api/arg-types)
   */
  argTypes?: Partial<ArgTypes<TArgs>>;

  /** Named tags for a story, used to filter stories in different contexts. */
  tags?: Tag[];
}

export interface ProjectAnnotations<TArgs = Args>
  extends BaseAnnotations<TArgs> {
  /** @deprecated Project `globals` renamed to `initiaGlobals` */
  globals?: Globals;
  initialGlobals?: Globals;
  globalTypes?: GlobalTypes;
}

export interface ComponentAnnotations<TArgs = Args>
  extends BaseAnnotations<TArgs> {
  /**
   * Title of the component which will be presented in the navigation. **Should be unique.**
   *
   * Components can be organized in a nested structure using "/" as a separator.
   *
   * Since CSF 3.0 this property is optional -- it can be inferred from the filesystem path
   *
   * @example Export default { ... title: 'Design System/Atoms/Button' }
   *
   * @see [Story Hierarchy](https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy#structure-and-hierarchy)
   */
  title?: ComponentTitle;

  /**
   * Id of the component (prefix of the story id) which is used for URLs.
   *
   * By default is inferred from sanitizing the title
   *
   * @see [Permalink to stories](https://storybook.js.org/docs/configure/sidebar-and-urls#permalink-to-stories)
   */
  id?: ComponentId;

  /** Override the globals values for all stories in this component */
  globals?: Globals;
}

export type StoryAnnotations<
  TArgs = Args,
  TRequiredArgs = Partial<TArgs>,
> = BaseAnnotations<TArgs> & {
  /** Override the display name in the UI (CSF v3) */
  name?: StoryName;

  /** Override the display name in the UI (CSF v2) */
  storyName?: StoryName;

  /** Override the globals values for this story */
  globals?: Globals;

  /** @deprecated */
  story?: Omit<StoryAnnotations<TArgs>, 'story'>;
  // eslint-disable-next-line @typescript-eslint/ban-types
} & ({} extends TRequiredArgs ? { args?: TRequiredArgs } : { args: TRequiredArgs });

