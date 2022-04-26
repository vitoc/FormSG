import { FormColorTheme } from '~shared/types'

import { useFormSections } from '~features/public-form/components/FormFields/FormSectionsContext'

import { BaseFieldProps } from '../FieldContainer'
import { SectionFieldSchema } from '../types'

import { SectionField } from './SectionField'

export interface SectionFieldContainerProps extends BaseFieldProps {
  schema: SectionFieldSchema
}

export const SectionFieldContainer = ({
  schema,
  colorTheme = FormColorTheme.Blue,
}: SectionFieldContainerProps): JSX.Element => {
  const { sectionRefs, setActiveSectionId } = useFormSections()

  return (
    <SectionField
      ref={sectionRefs[schema._id]}
      schema={schema}
      colorTheme={colorTheme}
      handleSectionEnter={() => setActiveSectionId(schema._id)}
    />
  )
}
