import { SdkItem } from '@progress/sitefinity-nextjs-sdk/rest-sdk';
import { Content, ContentSection, DataModel, DataType, DefaultValue, DisplayName, KnownFieldTypes, LinkModel, MediaItem, SdkItemModel, WidgetEntity } from '@progress/sitefinity-widget-designers-sdk';

@WidgetEntity('ModalWidget', 'ModalDialog')
export class ModalEntity {

  
   @ContentSection(1)
    @DisplayName('Enlace o pagina')
    @DataType(KnownFieldTypes.LinkSelector)
    LinkButton: LinkModel | null = null; 

    
    @ContentSection(2)
    @MediaItem('images', false, false)
    @DataType('media')
    @DisplayName('Elegir imagen')
    @DataModel(SdkItemModel)
    Image?: SdkItem | null = null;

 
     @ContentSection(3)
    @DefaultValue("Descubre más en E-learning.com")
    Content: string = "";
 
}