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
      S.listItem()
        .title('Cards')
        .child(
          S.list()
            .title('Cards')
            .items([
              S.documentTypeListItem('card').title('All'),
              S.listItem()
                .title('By Category')
                .child(
                  S.documentTypeList('cardCategory')
                    .title('Categories')
                    .child((categoryId) =>
                      S.documentList()
                        .title('Cards')
                        .filter(
                          '_type == "card" && $categoryId == category._ref'
                        )
                        .params({ categoryId })
                    )
                ),
              S.listItem()
                .title('By Recipient')
                .child(
                  S.documentTypeList('recipient')
                    .title('Recipients')
                    .child((recipientId) =>
                      S.documentList()
                        .title('Cards')
                        .filter(
                          '_type == "card" && $recipientId == recipient._ref'
                        )
                        .params({ recipientId })
                    )
                ),
            ])
        ),
      S.divider(),
      S.documentTypeListItem('recipient').title('Recipients'),
      S.documentTypeListItem('cardCategory').title('Categories'),
    ]);
