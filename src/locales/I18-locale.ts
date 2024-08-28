import I18n from "i18n";
import express from "express";
import path from "path";
export default function I18NLCAOLE(app:express.Application) {
  console.log(__dirname)
      I18n.configure({
        locales: ['en','ja'],
        directory: path.join(__dirname,"json"),
        defaultLocale: 'en',
        updateFiles:false,
        cookie: 'locale'
      });
    app.use(I18n.init);
}