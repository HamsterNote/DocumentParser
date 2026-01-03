# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2026-01-03

### Fixed
- 修复 ESM 模块导入路径问题，确保 Node.js ESM 环境下正确导入模块
- 更新 TypeScript 编译配置，使用 `NodeNext` 模块系统以确保正确的 ESM 支持
