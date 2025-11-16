# Angular Project with Material Design & Tailwind CSS

Este projeto Angular foi configurado com **Angular Material** e **Tailwind CSS** para oferecer uma experiência de desenvolvimento moderna e eficiente.

## 🚀 Tecnologias

- **Angular 20.1.4** - Framework principal
- **Angular Material** - Componentes UI baseados em Material Design (tema Cyan/Orange)
- **Tailwind CSS 3.x** - Framework CSS utility-first
- **TypeScript** - Linguagem de programação
- **SCSS** - Pré-processador CSS

## 📦 Instalação

1. Clone o projeto ou navegue até o diretório
2. Instale as dependências:

```bash
npm install
```

## 🛠️ Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
ng serve
```

O aplicativo estará disponível em `http://localhost:4200/`. A aplicação recarrega automaticamente quando você modificar os arquivos.

## 🎨 Usando Angular Material

Os componentes do Angular Material estão disponíveis para uso. Exemplo:

```typescript
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

// Use nos seus componentes
@Component({
  selector: 'app-example',
  imports: [MatButtonModule, MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      <span>Minha App</span>
    </mat-toolbar>
    <button mat-raised-button color="accent">Botão Material</button>
  `
})
```

## 🎯 Usando Tailwind CSS

Use as classes utilitárias do Tailwind diretamente nos templates:

```html
<div class="flex items-center justify-center h-screen bg-gray-100">
  <div class="p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-gray-800">Hello Tailwind!</h1>
    <p class="mt-2 text-gray-600">Classes utilitárias para styling rápido</p>
  </div>
</div>
```

## 🏗️ Build

Para fazer build do projeto:

```bash
ng build
```

Os arquivos compilados serão armazenados no diretório `dist/`.

## 🧪 Testes

Para executar os testes unitários:

```bash
ng test
```

## 📚 Scaffolding de Código

O Angular CLI inclui ferramentas poderosas para gerar código. Para criar um novo componente:

```bash
ng generate component nome-do-componente
```

Para uma lista completa de schematics disponíveis:

```bash
ng generate --help
```

## 🧪 Testes End-to-End

Para testes e2e, execute:

```bash
ng e2e
```

## 📖 Recursos Adicionais

- [Documentação Angular](https://angular.dev)
- [Angular Material](https://material.angular.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Angular CLI Reference](https://angular.dev/tools/cli)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

**Projeto configurado e pronto para desenvolvimento!** 🎉
