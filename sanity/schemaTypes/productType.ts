import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export  const productType = defineType({
    name: 'product',
    title: 'Products',
    type: 'document',
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Product Name',
            type: 'string', 
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
  name: "images",
  title: "Product Images",
  type: "array",
  of: [
    {
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
  validation: (Rule) => Rule.min(1).required(),
},),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'blockContent', 
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number', 
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'category' }] }],
        }),
        defineField({
            name: 'stock',
            title: 'Stock',
            type: 'number',
            validation: (Rule) => Rule.min(0),
        }),
        defineField({
            name: "featured",
            title: "Featured Product",
            type: "boolean",
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: "name",
            media: "image",
            price: "price",   
        },
        prepare(select) {
            return {
                title: select.title,
                subtitle: `₱${select.price}`,
                media: select.media,
            };
        },
    },
});