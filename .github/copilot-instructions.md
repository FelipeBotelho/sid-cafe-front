# Sid Café - Sistema de Gerenciamento Angular

Este é um projeto Angular configurado com:
- **Angular Material** - Componentes UI baseados em Material Design (tema Cyan/Orange)
- **Tailwind CSS** - Framework CSS utility-first com cores personalizadas do café
- **Homepage do Café** - Interface inicial inspirada no projeto React Sid Café
- **Tipografia** - Fontes Inter (sans-serif) e Lora (serif) do Google Fonts
- **Arquitetura Modular** - Componentes e páginas separadas em diretórios organizados

## 🎨 Cores do Tema Café
- `coffee-100`: #F5EFE6 (fundo claro)
- `coffee-200`: #E8DFCA (tons médios)
- `coffee-500`: #785A4E (destaque)
- `coffee-800`: #4B3731 (escuro)
- `coffee-900`: #3C2A21 (mais escuro)

## 🏗️ Estrutura do Projeto
```
src/app/
├── components/           # Componentes reutilizáveis
│   ├── header/          # Header com navegação
│   └── footer/          # Footer com informações de contato
├── pages/               # Páginas da aplicação
│   ├── home/           # Homepage do café
│   ├── menu/           # Página do cardápio
│   └── admin/          # Área administrativa
├── shared/             # Código compartilhado
│   └── models/         # Interfaces TypeScript
└── services/           # Serviços da aplicação
```

## 🚀 Desenvolvimento
- Use `ng serve` para servidor de desenvolvimento
- Angular Material e Tailwind CSS estão totalmente integrados
- Lazy loading implementado para otimização de performance
- Templates HTML separados dos arquivos TypeScript

## 📱 Features Implementadas
- ✅ Header com navegação responsiva
- ✅ Homepage com seções: Hero, História, Características, CTA
- ✅ Footer com informações de contato
- ✅ Roteamento com lazy loading
- ✅ Componentes standalone para melhor performance
- ✅ Templates HTML organizados em arquivos separados

## 🛠️ Próximos Passos
- Implementar página do cardápio completa
- Desenvolver área administrativa
- Integração com backend
- Implementar autenticação
- Adicionar testes unitários

## Status: Arquitetura Modular Concluída ✅
