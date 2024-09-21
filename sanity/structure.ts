import { CogIcon } from '@sanity/icons';
import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Sentiments')
    .items([
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(
          S.editor()
            .id('settings')
            .schemaType('settings')
            .documentId('settings')
        ),
      S.documentTypeListItem('card').title('Cards'),
    ]);
