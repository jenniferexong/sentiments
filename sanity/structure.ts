import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Sentiments')
    .items([
      S.documentTypeListItem('card').title('Cards'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['card'].includes(item.getId()!)
      ),
    ]);
