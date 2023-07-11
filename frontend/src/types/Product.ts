export class Product {

    constructor(public id: string,
                public sku: string,
                public name: string,
                public unitPrice: number,
                public imageUrl: string[],
                public active: boolean,
                public unitsInStock: number,
                public dateCreated: Date,
                public lastUpdated: Date,
                public brandId: number,
                public dimension?: string,
                public special?: string,
                public pieces?: number,
                
    ) {
    }
}