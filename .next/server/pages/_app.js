"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./src/components/Layout/AppLayout.tsx":
/*!*********************************************!*\
  !*** ./src/components/Layout/AppLayout.tsx ***!
  \*********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AppLayout)\n/* harmony export */ });\n/* harmony import */ var _emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/react/jsx-dev-runtime */ \"@emotion/react/jsx-dev-runtime\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=AppBar,Avatar,Box,Chip,Divider,Drawer,IconButton,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Menu,MenuItem,Toolbar,Typography,alpha,useTheme!=!@mui/material */ \"(pages-dir-node)/__barrel_optimize__?names=AppBar,Avatar,Box,Chip,Divider,Drawer,IconButton,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Menu,MenuItem,Toolbar,Typography,alpha,useTheme!=!./node_modules/@mui/material/index.js\");\n/* harmony import */ var _barrel_optimize_names_AccountCircle_Assignment_Business_Campaign_Dashboard_Logout_Menu_Notifications_People_Settings_TrendingUp_mui_icons_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=AccountCircle,Assignment,Business,Campaign,Dashboard,Logout,Menu,Notifications,People,Settings,TrendingUp!=!@mui/icons-material */ \"(pages-dir-node)/__barrel_optimize__?names=AccountCircle,Assignment,Business,Campaign,Dashboard,Logout,Menu,Notifications,People,Settings,TrendingUp!=!./node_modules/@mui/icons-material/esm/index.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"(pages-dir-node)/./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__, _barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__]);\n([_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__, _barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\nconst DRAWER_WIDTH = 280;\nconst navigationItems = [\n    {\n        label: 'Dashboard',\n        href: '/',\n        icon: /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AccountCircle_Assignment_Business_Campaign_Dashboard_Logout_Menu_Notifications_People_Settings_TrendingUp_mui_icons_material__WEBPACK_IMPORTED_MODULE_4__.Dashboard, {}, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n            lineNumber: 52,\n            columnNumber: 11\n        }, undefined),\n        description: 'Overview and analytics'\n    },\n    {\n        label: 'Lead Generation',\n        href: '/leads',\n        icon: /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AccountCircle_Assignment_Business_Campaign_Dashboard_Logout_Menu_Notifications_People_Settings_TrendingUp_mui_icons_material__WEBPACK_IMPORTED_MODULE_4__.TrendingUp, {}, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n            lineNumber: 58,\n            columnNumber: 11\n        }, undefined),\n        description: 'Generate and manage leads'\n    },\n    {\n        label: 'Campaigns',\n        href: '/campaigns',\n        icon: /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AccountCircle_Assignment_Business_Campaign_Dashboard_Logout_Menu_Notifications_People_Settings_TrendingUp_mui_icons_material__WEBPACK_IMPORTED_MODULE_4__.Campaign, {}, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n            lineNumber: 64,\n            columnNumber: 11\n        }, undefined),\n        badge: 3,\n        description: 'Email marketing campaigns'\n    },\n    {\n        label: 'Customers',\n        href: '/customers',\n        icon: /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AccountCircle_Assignment_Business_Campaign_Dashboard_Logout_Menu_Notifications_People_Settings_TrendingUp_mui_icons_material__WEBPACK_IMPORTED_MODULE_4__.People, {}, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n            lineNumber: 71,\n            columnNumber: 11\n        }, undefined),\n        description: 'Customer management'\n    },\n    {\n        label: 'Properties',\n        href: '/properties',\n        icon: /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AccountCircle_Assignment_Business_Campaign_Dashboard_Logout_Menu_Notifications_People_Settings_TrendingUp_mui_icons_material__WEBPACK_IMPORTED_MODULE_4__.Business, {}, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n            lineNumber: 77,\n            columnNumber: 11\n        }, undefined),\n        description: 'Property database'\n    },\n    {\n        label: 'Projects',\n        href: '/projects',\n        icon: /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AccountCircle_Assignment_Business_Campaign_Dashboard_Logout_Menu_Notifications_People_Settings_TrendingUp_mui_icons_material__WEBPACK_IMPORTED_MODULE_4__.Assignment, {}, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n            lineNumber: 83,\n            columnNumber: 11\n        }, undefined),\n        description: 'Active and completed projects'\n    },\n    {\n        label: 'Debug Console',\n        href: '/debug',\n        icon: /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AccountCircle_Assignment_Business_Campaign_Dashboard_Logout_Menu_Notifications_People_Settings_TrendingUp_mui_icons_material__WEBPACK_IMPORTED_MODULE_4__.Settings, {}, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n            lineNumber: 89,\n            columnNumber: 11\n        }, undefined),\n        description: 'API connectivity debug tools'\n    }\n];\nfunction AppLayout({ children, title = 'Smart Home CRM' }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const theme = (0,_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.useTheme)();\n    const [mobileOpen, setMobileOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [userMenuAnchor, setUserMenuAnchor] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const handleDrawerToggle = ()=>{\n        setMobileOpen(!mobileOpen);\n    };\n    const handleUserMenuOpen = (event)=>{\n        setUserMenuAnchor(event.currentTarget);\n    };\n    const handleUserMenuClose = ()=>{\n        setUserMenuAnchor(null);\n    };\n    const isActivePath = (href)=>{\n        if (href === '/') {\n            return router.pathname === '/';\n        }\n        return router.pathname.startsWith(href);\n    };\n    const drawer = /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Box, {\n        sx: {\n            height: '100%',\n            display: 'flex',\n            flexDirection: 'column'\n        },\n        children: [\n            /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Box, {\n                sx: {\n                    p: 3,\n                    borderBottom: `1px solid ${theme.palette.divider}`\n                },\n                children: [\n                    /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Typography, {\n                        variant: \"h5\",\n                        fontWeight: \"bold\",\n                        color: \"primary\",\n                        children: \"Smart Home CRM\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                        lineNumber: 128,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Typography, {\n                        variant: \"body2\",\n                        color: \"text.secondary\",\n                        children: \"Customer Relationship Management\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                        lineNumber: 131,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                lineNumber: 127,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.List, {\n                sx: {\n                    flex: 1,\n                    py: 2\n                },\n                children: navigationItems.map((item)=>/*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.ListItem, {\n                        disablePadding: true,\n                        sx: {\n                            mb: 0.5\n                        },\n                        children: /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.ListItemButton, {\n                            component: (next_link__WEBPACK_IMPORTED_MODULE_3___default()),\n                            href: item.href,\n                            selected: isActivePath(item.href),\n                            sx: {\n                                mx: 2,\n                                borderRadius: 2,\n                                '&.Mui-selected': {\n                                    backgroundColor: (0,_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.alpha)(theme.palette.primary.main, 0.1),\n                                    color: theme.palette.primary.main,\n                                    '&:hover': {\n                                        backgroundColor: (0,_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.alpha)(theme.palette.primary.main, 0.2)\n                                    }\n                                },\n                                '&:hover': {\n                                    backgroundColor: (0,_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.alpha)(theme.palette.action.hover, 0.8)\n                                }\n                            },\n                            children: [\n                                /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.ListItemIcon, {\n                                    sx: {\n                                        color: 'inherit',\n                                        minWidth: 40\n                                    },\n                                    children: item.icon\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                                    lineNumber: 159,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.ListItemText, {\n                                    primary: item.label,\n                                    secondary: item.description,\n                                    primaryTypographyProps: {\n                                        fontSize: '0.95rem',\n                                        fontWeight: isActivePath(item.href) ? 600 : 400\n                                    },\n                                    secondaryTypographyProps: {\n                                        fontSize: '0.75rem',\n                                        color: 'text.secondary'\n                                    }\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                                    lineNumber: 167,\n                                    columnNumber: 15\n                                }, this),\n                                item.badge && /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Chip, {\n                                    label: item.badge,\n                                    size: \"small\",\n                                    color: \"primary\",\n                                    sx: {\n                                        ml: 1,\n                                        height: 20,\n                                        fontSize: '0.75rem'\n                                    }\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                                    lineNumber: 180,\n                                    columnNumber: 17\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                            lineNumber: 140,\n                            columnNumber: 13\n                        }, this)\n                    }, item.href, false, {\n                        fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                        lineNumber: 139,\n                        columnNumber: 11\n                    }, this))\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                lineNumber: 137,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Box, {\n                sx: {\n                    borderTop: `1px solid ${theme.palette.divider}`,\n                    p: 2\n                },\n                children: /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.ListItem, {\n                    disablePadding: true,\n                    children: /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.ListItemButton, {\n                        component: (next_link__WEBPACK_IMPORTED_MODULE_3___default()),\n                        href: \"/settings\",\n                        sx: {\n                            borderRadius: 2\n                        },\n                        children: [\n                            /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.ListItemIcon, {\n                                sx: {\n                                    minWidth: 40\n                                },\n                                children: /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AccountCircle_Assignment_Business_Campaign_Dashboard_Logout_Menu_Notifications_People_Settings_TrendingUp_mui_icons_material__WEBPACK_IMPORTED_MODULE_4__.Settings, {}, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                                    lineNumber: 201,\n                                    columnNumber: 15\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                                lineNumber: 200,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.ListItemText, {\n                                primary: \"Settings\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                                lineNumber: 203,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                        lineNumber: 195,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                    lineNumber: 194,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                lineNumber: 193,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n        lineNumber: 125,\n        columnNumber: 5\n    }, this);\n    return /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Box, {\n        sx: {\n            display: 'flex',\n            height: '100vh'\n        },\n        children: [\n            /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.AppBar, {\n                position: \"fixed\",\n                sx: {\n                    width: {\n                        md: `calc(100% - ${DRAWER_WIDTH}px)`\n                    },\n                    ml: {\n                        md: `${DRAWER_WIDTH}px`\n                    },\n                    backgroundColor: 'background.paper',\n                    color: 'text.primary',\n                    borderBottom: `1px solid ${theme.palette.divider}`,\n                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'\n                },\n                children: /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Toolbar, {\n                    children: [\n                        /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.IconButton, {\n                            color: \"inherit\",\n                            \"aria-label\": \"open drawer\",\n                            edge: \"start\",\n                            onClick: handleDrawerToggle,\n                            sx: {\n                                mr: 2,\n                                display: {\n                                    md: 'none'\n                                }\n                            },\n                            children: /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AccountCircle_Assignment_Business_Campaign_Dashboard_Logout_Menu_Notifications_People_Settings_TrendingUp_mui_icons_material__WEBPACK_IMPORTED_MODULE_4__.Menu, {}, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                                lineNumber: 232,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                            lineNumber: 225,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Typography, {\n                            variant: \"h6\",\n                            noWrap: true,\n                            component: \"div\",\n                            sx: {\n                                flexGrow: 1\n                            },\n                            children: title\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                            lineNumber: 235,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Box, {\n                            sx: {\n                                display: 'flex',\n                                alignItems: 'center',\n                                gap: 1\n                            },\n                            children: [\n                                /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.IconButton, {\n                                    color: \"inherit\",\n                                    children: /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AccountCircle_Assignment_Business_Campaign_Dashboard_Logout_Menu_Notifications_People_Settings_TrendingUp_mui_icons_material__WEBPACK_IMPORTED_MODULE_4__.Notifications, {}, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                                        lineNumber: 242,\n                                        columnNumber: 15\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                                    lineNumber: 241,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.IconButton, {\n                                    onClick: handleUserMenuOpen,\n                                    color: \"inherit\",\n                                    children: /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Avatar, {\n                                        sx: {\n                                            width: 32,\n                                            height: 32\n                                        },\n                                        children: /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AccountCircle_Assignment_Business_Campaign_Dashboard_Logout_Menu_Notifications_People_Settings_TrendingUp_mui_icons_material__WEBPACK_IMPORTED_MODULE_4__.AccountCircle, {}, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                                            lineNumber: 250,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                                        lineNumber: 249,\n                                        columnNumber: 15\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                                    lineNumber: 245,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                            lineNumber: 240,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                    lineNumber: 224,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                lineNumber: 213,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Menu, {\n                anchorEl: userMenuAnchor,\n                open: Boolean(userMenuAnchor),\n                onClose: handleUserMenuClose,\n                onClick: handleUserMenuClose,\n                PaperProps: {\n                    elevation: 3,\n                    sx: {\n                        mt: 1.5,\n                        minWidth: 200\n                    }\n                },\n                children: [\n                    /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.MenuItem, {\n                        children: [\n                            /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Avatar, {\n                                sx: {\n                                    mr: 2,\n                                    width: 24,\n                                    height: 24\n                                },\n                                children: /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AccountCircle_Assignment_Business_Campaign_Dashboard_Logout_Menu_Notifications_People_Settings_TrendingUp_mui_icons_material__WEBPACK_IMPORTED_MODULE_4__.AccountCircle, {}, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                                    lineNumber: 273,\n                                    columnNumber: 13\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                                lineNumber: 272,\n                                columnNumber: 11\n                            }, this),\n                            \"Profile\"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                        lineNumber: 271,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.MenuItem, {\n                        children: [\n                            /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AccountCircle_Assignment_Business_Campaign_Dashboard_Logout_Menu_Notifications_People_Settings_TrendingUp_mui_icons_material__WEBPACK_IMPORTED_MODULE_4__.Settings, {\n                                sx: {\n                                    mr: 2,\n                                    width: 24,\n                                    height: 24\n                                }\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                                lineNumber: 278,\n                                columnNumber: 11\n                            }, this),\n                            \"Settings\"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                        lineNumber: 277,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Divider, {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                        lineNumber: 281,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.MenuItem, {\n                        children: [\n                            /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AccountCircle_Assignment_Business_Campaign_Dashboard_Logout_Menu_Notifications_People_Settings_TrendingUp_mui_icons_material__WEBPACK_IMPORTED_MODULE_4__.Logout, {\n                                sx: {\n                                    mr: 2,\n                                    width: 24,\n                                    height: 24\n                                }\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                                lineNumber: 283,\n                                columnNumber: 11\n                            }, this),\n                            \"Logout\"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                        lineNumber: 282,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                lineNumber: 258,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Box, {\n                component: \"nav\",\n                sx: {\n                    width: {\n                        md: DRAWER_WIDTH\n                    },\n                    flexShrink: {\n                        md: 0\n                    }\n                },\n                children: [\n                    /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Drawer, {\n                        variant: \"temporary\",\n                        open: mobileOpen,\n                        onClose: handleDrawerToggle,\n                        ModalProps: {\n                            keepMounted: true\n                        },\n                        sx: {\n                            display: {\n                                xs: 'block',\n                                md: 'none'\n                            },\n                            '& .MuiDrawer-paper': {\n                                boxSizing: 'border-box',\n                                width: DRAWER_WIDTH\n                            }\n                        },\n                        children: drawer\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                        lineNumber: 294,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Drawer, {\n                        variant: \"permanent\",\n                        sx: {\n                            display: {\n                                xs: 'none',\n                                md: 'block'\n                            },\n                            '& .MuiDrawer-paper': {\n                                boxSizing: 'border-box',\n                                width: DRAWER_WIDTH,\n                                borderRight: `1px solid ${theme.palette.divider}`\n                            }\n                        },\n                        open: true,\n                        children: drawer\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                        lineNumber: 313,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                lineNumber: 289,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Box, {\n                component: \"main\",\n                sx: {\n                    flexGrow: 1,\n                    width: {\n                        md: `calc(100% - ${DRAWER_WIDTH}px)`\n                    },\n                    height: '100vh',\n                    overflow: 'auto'\n                },\n                children: [\n                    /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Toolbar, {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                        lineNumber: 339,\n                        columnNumber: 9\n                    }, this),\n                    \" \",\n                    /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Avatar_Box_Chip_Divider_Drawer_IconButton_List_ListItem_ListItemButton_ListItemIcon_ListItemText_Menu_MenuItem_Toolbar_Typography_alpha_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_5__.Box, {\n                        sx: {\n                            flex: 1,\n                            minHeight: 'calc(100vh - 64px)'\n                        },\n                        children: children\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                        lineNumber: 340,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n                lineNumber: 330,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\components\\\\Layout\\\\AppLayout.tsx\",\n        lineNumber: 211,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9jb21wb25lbnRzL0xheW91dC9BcHBMYXlvdXQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBb0JqQjtBQWFNO0FBQ1c7QUFDWDtBQUU3QixNQUFNMEMsZUFBZTtBQVVyQixNQUFNQyxrQkFBb0M7SUFDeEM7UUFDRUMsT0FBTztRQUNQQyxNQUFNO1FBQ05DLG9CQUFNLHVFQUFDekIsMExBQWFBOzs7OztRQUNwQjBCLGFBQWE7SUFDZjtJQUNBO1FBQ0VILE9BQU87UUFDUEMsTUFBTTtRQUNOQyxvQkFBTSx1RUFBQ25CLDJMQUFRQTs7Ozs7UUFDZm9CLGFBQWE7SUFDZjtJQUNBO1FBQ0VILE9BQU87UUFDUEMsTUFBTTtRQUNOQyxvQkFBTSx1RUFBQ3JCLHlMQUFZQTs7Ozs7UUFDbkJ1QixPQUFPO1FBQ1BELGFBQWE7SUFDZjtJQUNBO1FBQ0VILE9BQU87UUFDUEMsTUFBTTtRQUNOQyxvQkFBTSx1RUFBQ3ZCLHVMQUFVQTs7Ozs7UUFDakJ3QixhQUFhO0lBQ2Y7SUFDQTtRQUNFSCxPQUFPO1FBQ1BDLE1BQU07UUFDTkMsb0JBQU0sdUVBQUNqQix5TEFBWUE7Ozs7O1FBQ25Ca0IsYUFBYTtJQUNmO0lBQ0E7UUFDRUgsT0FBTztRQUNQQyxNQUFNO1FBQ05DLG9CQUFNLHVFQUFDZiwyTEFBV0E7Ozs7O1FBQ2xCZ0IsYUFBYTtJQUNmO0lBQ0E7UUFDRUgsT0FBTztRQUNQQyxNQUFNO1FBQ05DLG9CQUFNLHVFQUFDYix5TEFBWUE7Ozs7O1FBQ25CYyxhQUFhO0lBQ2Y7Q0FDRDtBQU9jLFNBQVNFLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxRQUFRLGdCQUFnQixFQUFrQjtJQUN0RixNQUFNQyxTQUFTWixzREFBU0E7SUFDeEIsTUFBTWEsUUFBUW5DLHFPQUFRQTtJQUN0QixNQUFNLENBQUNvQyxZQUFZQyxjQUFjLEdBQUd0RCwrQ0FBUUEsQ0FBQztJQUM3QyxNQUFNLENBQUN1RCxnQkFBZ0JDLGtCQUFrQixH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IjpbIkM6XFxVc2Vyc1xcU2hvbiBQQ1xcRGVza3RvcFxcc21hcnQtaG9tZS1jcm1cXHNyY1xcY29tcG9uZW50c1xcTGF5b3V0XFxBcHBMYXlvdXQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtcclxuICBCb3gsXHJcbiAgRHJhd2VyLFxyXG4gIEFwcEJhcixcclxuICBUb29sYmFyLFxyXG4gIFR5cG9ncmFwaHksXHJcbiAgTGlzdCxcclxuICBMaXN0SXRlbSxcclxuICBMaXN0SXRlbUJ1dHRvbixcclxuICBMaXN0SXRlbUljb24sXHJcbiAgTGlzdEl0ZW1UZXh0LFxyXG4gIEljb25CdXR0b24sXHJcbiAgQXZhdGFyLFxyXG4gIE1lbnUsXHJcbiAgTWVudUl0ZW0sXHJcbiAgRGl2aWRlcixcclxuICBDaGlwLFxyXG4gIHVzZVRoZW1lLFxyXG4gIGFscGhhLFxyXG59IGZyb20gJ0BtdWkvbWF0ZXJpYWwnO1xyXG5pbXBvcnQge1xyXG4gIERhc2hib2FyZCBhcyBEYXNoYm9hcmRJY29uLFxyXG4gIFBlb3BsZSBhcyBQZW9wbGVJY29uLFxyXG4gIENhbXBhaWduIGFzIENhbXBhaWduSWNvbixcclxuICBUcmVuZGluZ1VwIGFzIExlYWRJY29uLFxyXG4gIEJ1c2luZXNzIGFzIEJ1c2luZXNzSWNvbixcclxuICBBc3NpZ25tZW50IGFzIFByb2plY3RJY29uLFxyXG4gIFNldHRpbmdzIGFzIFNldHRpbmdzSWNvbixcclxuICBOb3RpZmljYXRpb25zIGFzIE5vdGlmaWNhdGlvbnNJY29uLFxyXG4gIE1lbnUgYXMgTWVudUljb24sXHJcbiAgQWNjb3VudENpcmNsZSxcclxuICBMb2dvdXQgYXMgTG9nb3V0SWNvbixcclxufSBmcm9tICdAbXVpL2ljb25zLW1hdGVyaWFsJztcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xyXG5cclxuY29uc3QgRFJBV0VSX1dJRFRIID0gMjgwO1xyXG5cclxuaW50ZXJmYWNlIE5hdmlnYXRpb25JdGVtIHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIGhyZWY6IHN0cmluZztcclxuICBpY29uOiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgYmFkZ2U/OiBudW1iZXI7XHJcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmNvbnN0IG5hdmlnYXRpb25JdGVtczogTmF2aWdhdGlvbkl0ZW1bXSA9IFtcclxuICB7XHJcbiAgICBsYWJlbDogJ0Rhc2hib2FyZCcsXHJcbiAgICBocmVmOiAnLycsXHJcbiAgICBpY29uOiA8RGFzaGJvYXJkSWNvbiAvPixcclxuICAgIGRlc2NyaXB0aW9uOiAnT3ZlcnZpZXcgYW5kIGFuYWx5dGljcydcclxuICB9LFxyXG4gIHtcclxuICAgIGxhYmVsOiAnTGVhZCBHZW5lcmF0aW9uJyxcclxuICAgIGhyZWY6ICcvbGVhZHMnLFxyXG4gICAgaWNvbjogPExlYWRJY29uIC8+LFxyXG4gICAgZGVzY3JpcHRpb246ICdHZW5lcmF0ZSBhbmQgbWFuYWdlIGxlYWRzJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbGFiZWw6ICdDYW1wYWlnbnMnLFxyXG4gICAgaHJlZjogJy9jYW1wYWlnbnMnLFxyXG4gICAgaWNvbjogPENhbXBhaWduSWNvbiAvPixcclxuICAgIGJhZGdlOiAzLFxyXG4gICAgZGVzY3JpcHRpb246ICdFbWFpbCBtYXJrZXRpbmcgY2FtcGFpZ25zJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbGFiZWw6ICdDdXN0b21lcnMnLFxyXG4gICAgaHJlZjogJy9jdXN0b21lcnMnLFxyXG4gICAgaWNvbjogPFBlb3BsZUljb24gLz4sXHJcbiAgICBkZXNjcmlwdGlvbjogJ0N1c3RvbWVyIG1hbmFnZW1lbnQnXHJcbiAgfSxcclxuICB7XHJcbiAgICBsYWJlbDogJ1Byb3BlcnRpZXMnLFxyXG4gICAgaHJlZjogJy9wcm9wZXJ0aWVzJyxcclxuICAgIGljb246IDxCdXNpbmVzc0ljb24gLz4sXHJcbiAgICBkZXNjcmlwdGlvbjogJ1Byb3BlcnR5IGRhdGFiYXNlJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbGFiZWw6ICdQcm9qZWN0cycsXHJcbiAgICBocmVmOiAnL3Byb2plY3RzJyxcclxuICAgIGljb246IDxQcm9qZWN0SWNvbiAvPixcclxuICAgIGRlc2NyaXB0aW9uOiAnQWN0aXZlIGFuZCBjb21wbGV0ZWQgcHJvamVjdHMnXHJcbiAgfSxcclxuICB7XHJcbiAgICBsYWJlbDogJ0RlYnVnIENvbnNvbGUnLFxyXG4gICAgaHJlZjogJy9kZWJ1ZycsXHJcbiAgICBpY29uOiA8U2V0dGluZ3NJY29uIC8+LFxyXG4gICAgZGVzY3JpcHRpb246ICdBUEkgY29ubmVjdGl2aXR5IGRlYnVnIHRvb2xzJ1xyXG4gIH0sXHJcbl07XHJcblxyXG5pbnRlcmZhY2UgQXBwTGF5b3V0UHJvcHMge1xyXG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgdGl0bGU/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcExheW91dCh7IGNoaWxkcmVuLCB0aXRsZSA9ICdTbWFydCBIb21lIENSTScgfTogQXBwTGF5b3V0UHJvcHMpIHtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XHJcbiAgY29uc3QgW21vYmlsZU9wZW4sIHNldE1vYmlsZU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFt1c2VyTWVudUFuY2hvciwgc2V0VXNlck1lbnVBbmNob3JdID0gdXNlU3RhdGU8bnVsbCB8IEhUTUxFbGVtZW50PihudWxsKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRHJhd2VyVG9nZ2xlID0gKCkgPT4ge1xyXG4gICAgc2V0TW9iaWxlT3BlbighbW9iaWxlT3Blbik7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVXNlck1lbnVPcGVuID0gKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxFbGVtZW50PikgPT4ge1xyXG4gICAgc2V0VXNlck1lbnVBbmNob3IoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVXNlck1lbnVDbG9zZSA9ICgpID0+IHtcclxuICAgIHNldFVzZXJNZW51QW5jaG9yKG51bGwpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGlzQWN0aXZlUGF0aCA9IChocmVmOiBzdHJpbmcpID0+IHtcclxuICAgIGlmIChocmVmID09PSAnLycpIHtcclxuICAgICAgcmV0dXJuIHJvdXRlci5wYXRobmFtZSA9PT0gJy8nO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJvdXRlci5wYXRobmFtZS5zdGFydHNXaXRoKGhyZWYpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGRyYXdlciA9IChcclxuICAgIDxCb3ggc3g9e3sgaGVpZ2h0OiAnMTAwJScsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicgfX0+XHJcbiAgICAgIHsvKiBMb2dvL0JyYW5kICovfVxyXG4gICAgICA8Qm94IHN4PXt7IHA6IDMsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLnBhbGV0dGUuZGl2aWRlcn1gIH19PlxyXG4gICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJoNVwiIGZvbnRXZWlnaHQ9XCJib2xkXCIgY29sb3I9XCJwcmltYXJ5XCI+XHJcbiAgICAgICAgICBTbWFydCBIb21lIENSTVxyXG4gICAgICAgIDwvVHlwb2dyYXBoeT5cclxuICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiYm9keTJcIiBjb2xvcj1cInRleHQuc2Vjb25kYXJ5XCI+XHJcbiAgICAgICAgICBDdXN0b21lciBSZWxhdGlvbnNoaXAgTWFuYWdlbWVudFxyXG4gICAgICAgIDwvVHlwb2dyYXBoeT5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICB7LyogTmF2aWdhdGlvbiAqL31cclxuICAgICAgPExpc3Qgc3g9e3sgZmxleDogMSwgcHk6IDIgfX0+XHJcbiAgICAgICAge25hdmlnYXRpb25JdGVtcy5tYXAoKGl0ZW0pID0+IChcclxuICAgICAgICAgIDxMaXN0SXRlbSBrZXk9e2l0ZW0uaHJlZn0gZGlzYWJsZVBhZGRpbmcgc3g9e3sgbWI6IDAuNSB9fT5cclxuICAgICAgICAgICAgPExpc3RJdGVtQnV0dG9uXHJcbiAgICAgICAgICAgICAgY29tcG9uZW50PXtMaW5rfVxyXG4gICAgICAgICAgICAgIGhyZWY9e2l0ZW0uaHJlZn1cclxuICAgICAgICAgICAgICBzZWxlY3RlZD17aXNBY3RpdmVQYXRoKGl0ZW0uaHJlZil9XHJcbiAgICAgICAgICAgICAgc3g9e3tcclxuICAgICAgICAgICAgICAgIG14OiAyLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAyLFxyXG4gICAgICAgICAgICAgICAgJyYuTXVpLXNlbGVjdGVkJzoge1xyXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGFscGhhKHRoZW1lLnBhbGV0dGUucHJpbWFyeS5tYWluLCAwLjEpLFxyXG4gICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUucGFsZXR0ZS5wcmltYXJ5Lm1haW4sXHJcbiAgICAgICAgICAgICAgICAgICcmOmhvdmVyJzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogYWxwaGEodGhlbWUucGFsZXR0ZS5wcmltYXJ5Lm1haW4sIDAuMiksXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJyY6aG92ZXInOiB7XHJcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogYWxwaGEodGhlbWUucGFsZXR0ZS5hY3Rpb24uaG92ZXIsIDAuOCksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8TGlzdEl0ZW1JY29uXHJcbiAgICAgICAgICAgICAgICBzeD17e1xyXG4gICAgICAgICAgICAgICAgICBjb2xvcjogJ2luaGVyaXQnLFxyXG4gICAgICAgICAgICAgICAgICBtaW5XaWR0aDogNDAsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtpdGVtLmljb259XHJcbiAgICAgICAgICAgICAgPC9MaXN0SXRlbUljb24+XHJcbiAgICAgICAgICAgICAgPExpc3RJdGVtVGV4dFxyXG4gICAgICAgICAgICAgICAgcHJpbWFyeT17aXRlbS5sYWJlbH1cclxuICAgICAgICAgICAgICAgIHNlY29uZGFyeT17aXRlbS5kZXNjcmlwdGlvbn1cclxuICAgICAgICAgICAgICAgIHByaW1hcnlUeXBvZ3JhcGh5UHJvcHM9e3tcclxuICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcwLjk1cmVtJyxcclxuICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogaXNBY3RpdmVQYXRoKGl0ZW0uaHJlZikgPyA2MDAgOiA0MDAsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5VHlwb2dyYXBoeVByb3BzPXt7XHJcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMC43NXJlbScsXHJcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiAndGV4dC5zZWNvbmRhcnknLFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIHtpdGVtLmJhZGdlICYmIChcclxuICAgICAgICAgICAgICAgIDxDaGlwXHJcbiAgICAgICAgICAgICAgICAgIGxhYmVsPXtpdGVtLmJhZGdlfVxyXG4gICAgICAgICAgICAgICAgICBzaXplPVwic21hbGxcIlxyXG4gICAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgICBzeD17eyBtbDogMSwgaGVpZ2h0OiAyMCwgZm9udFNpemU6ICcwLjc1cmVtJyB9fVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L0xpc3RJdGVtQnV0dG9uPlxyXG4gICAgICAgICAgPC9MaXN0SXRlbT5cclxuICAgICAgICApKX1cclxuICAgICAgPC9MaXN0PlxyXG5cclxuICAgICAgey8qIEJvdHRvbSBTZWN0aW9uICovfVxyXG4gICAgICA8Qm94IHN4PXt7IGJvcmRlclRvcDogYDFweCBzb2xpZCAke3RoZW1lLnBhbGV0dGUuZGl2aWRlcn1gLCBwOiAyIH19PlxyXG4gICAgICAgIDxMaXN0SXRlbSBkaXNhYmxlUGFkZGluZz5cclxuICAgICAgICAgIDxMaXN0SXRlbUJ1dHRvblxyXG4gICAgICAgICAgICBjb21wb25lbnQ9e0xpbmt9XHJcbiAgICAgICAgICAgIGhyZWY9XCIvc2V0dGluZ3NcIlxyXG4gICAgICAgICAgICBzeD17eyBib3JkZXJSYWRpdXM6IDIgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPExpc3RJdGVtSWNvbiBzeD17eyBtaW5XaWR0aDogNDAgfX0+XHJcbiAgICAgICAgICAgICAgPFNldHRpbmdzSWNvbiAvPlxyXG4gICAgICAgICAgICA8L0xpc3RJdGVtSWNvbj5cclxuICAgICAgICAgICAgPExpc3RJdGVtVGV4dCBwcmltYXJ5PVwiU2V0dGluZ3NcIiAvPlxyXG4gICAgICAgICAgPC9MaXN0SXRlbUJ1dHRvbj5cclxuICAgICAgICA8L0xpc3RJdGVtPlxyXG4gICAgICA8L0JveD5cclxuICAgIDwvQm94PlxyXG4gICk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94IHN4PXt7IGRpc3BsYXk6ICdmbGV4JywgaGVpZ2h0OiAnMTAwdmgnIH19PlxyXG4gICAgICB7LyogQXBwIEJhciAqL31cclxuICAgICAgPEFwcEJhclxyXG4gICAgICAgIHBvc2l0aW9uPVwiZml4ZWRcIlxyXG4gICAgICAgIHN4PXt7XHJcbiAgICAgICAgICB3aWR0aDogeyBtZDogYGNhbGMoMTAwJSAtICR7RFJBV0VSX1dJRFRIfXB4KWAgfSxcclxuICAgICAgICAgIG1sOiB7IG1kOiBgJHtEUkFXRVJfV0lEVEh9cHhgIH0sXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdiYWNrZ3JvdW5kLnBhcGVyJyxcclxuICAgICAgICAgIGNvbG9yOiAndGV4dC5wcmltYXJ5JyxcclxuICAgICAgICAgIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLnBhbGV0dGUuZGl2aWRlcn1gLFxyXG4gICAgICAgICAgYm94U2hhZG93OiAnMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4xKScsXHJcbiAgICAgICAgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxUb29sYmFyPlxyXG4gICAgICAgICAgPEljb25CdXR0b25cclxuICAgICAgICAgICAgY29sb3I9XCJpbmhlcml0XCJcclxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIm9wZW4gZHJhd2VyXCJcclxuICAgICAgICAgICAgZWRnZT1cInN0YXJ0XCJcclxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRHJhd2VyVG9nZ2xlfVxyXG4gICAgICAgICAgICBzeD17eyBtcjogMiwgZGlzcGxheTogeyBtZDogJ25vbmUnIH0gfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPE1lbnVJY29uIC8+XHJcbiAgICAgICAgICA8L0ljb25CdXR0b24+XHJcblxyXG4gICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImg2XCIgbm9XcmFwIGNvbXBvbmVudD1cImRpdlwiIHN4PXt7IGZsZXhHcm93OiAxIH19PlxyXG4gICAgICAgICAgICB7dGl0bGV9XHJcbiAgICAgICAgICA8L1R5cG9ncmFwaHk+XHJcblxyXG4gICAgICAgICAgey8qIEhlYWRlciBBY3Rpb25zICovfVxyXG4gICAgICAgICAgPEJveCBzeD17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDEgfX0+XHJcbiAgICAgICAgICAgIDxJY29uQnV0dG9uIGNvbG9yPVwiaW5oZXJpdFwiPlxyXG4gICAgICAgICAgICAgIDxOb3RpZmljYXRpb25zSWNvbiAvPlxyXG4gICAgICAgICAgICA8L0ljb25CdXR0b24+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8SWNvbkJ1dHRvblxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVVzZXJNZW51T3Blbn1cclxuICAgICAgICAgICAgICBjb2xvcj1cImluaGVyaXRcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPEF2YXRhciBzeD17eyB3aWR0aDogMzIsIGhlaWdodDogMzIgfX0+XHJcbiAgICAgICAgICAgICAgICA8QWNjb3VudENpcmNsZSAvPlxyXG4gICAgICAgICAgICAgIDwvQXZhdGFyPlxyXG4gICAgICAgICAgICA8L0ljb25CdXR0b24+XHJcbiAgICAgICAgICA8L0JveD5cclxuICAgICAgICA8L1Rvb2xiYXI+XHJcbiAgICAgIDwvQXBwQmFyPlxyXG5cclxuICAgICAgey8qIFVzZXIgTWVudSAqL31cclxuICAgICAgPE1lbnVcclxuICAgICAgICBhbmNob3JFbD17dXNlck1lbnVBbmNob3J9XHJcbiAgICAgICAgb3Blbj17Qm9vbGVhbih1c2VyTWVudUFuY2hvcil9XHJcbiAgICAgICAgb25DbG9zZT17aGFuZGxlVXNlck1lbnVDbG9zZX1cclxuICAgICAgICBvbkNsaWNrPXtoYW5kbGVVc2VyTWVudUNsb3NlfVxyXG4gICAgICAgIFBhcGVyUHJvcHM9e3tcclxuICAgICAgICAgIGVsZXZhdGlvbjogMyxcclxuICAgICAgICAgIHN4OiB7XHJcbiAgICAgICAgICAgIG10OiAxLjUsXHJcbiAgICAgICAgICAgIG1pbldpZHRoOiAyMDAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICA8TWVudUl0ZW0+XHJcbiAgICAgICAgICA8QXZhdGFyIHN4PXt7IG1yOiAyLCB3aWR0aDogMjQsIGhlaWdodDogMjQgfX0+XHJcbiAgICAgICAgICAgIDxBY2NvdW50Q2lyY2xlIC8+XHJcbiAgICAgICAgICA8L0F2YXRhcj5cclxuICAgICAgICAgIFByb2ZpbGVcclxuICAgICAgICA8L01lbnVJdGVtPlxyXG4gICAgICAgIDxNZW51SXRlbT5cclxuICAgICAgICAgIDxTZXR0aW5nc0ljb24gc3g9e3sgbXI6IDIsIHdpZHRoOiAyNCwgaGVpZ2h0OiAyNCB9fSAvPlxyXG4gICAgICAgICAgU2V0dGluZ3NcclxuICAgICAgICA8L01lbnVJdGVtPlxyXG4gICAgICAgIDxEaXZpZGVyIC8+XHJcbiAgICAgICAgPE1lbnVJdGVtPlxyXG4gICAgICAgICAgPExvZ291dEljb24gc3g9e3sgbXI6IDIsIHdpZHRoOiAyNCwgaGVpZ2h0OiAyNCB9fSAvPlxyXG4gICAgICAgICAgTG9nb3V0XHJcbiAgICAgICAgPC9NZW51SXRlbT5cclxuICAgICAgPC9NZW51PlxyXG5cclxuICAgICAgey8qIE5hdmlnYXRpb24gRHJhd2VyICovfVxyXG4gICAgICA8Qm94XHJcbiAgICAgICAgY29tcG9uZW50PVwibmF2XCJcclxuICAgICAgICBzeD17eyB3aWR0aDogeyBtZDogRFJBV0VSX1dJRFRIIH0sIGZsZXhTaHJpbms6IHsgbWQ6IDAgfSB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgey8qIE1vYmlsZSBkcmF3ZXIgKi99XHJcbiAgICAgICAgPERyYXdlclxyXG4gICAgICAgICAgdmFyaWFudD1cInRlbXBvcmFyeVwiXHJcbiAgICAgICAgICBvcGVuPXttb2JpbGVPcGVufVxyXG4gICAgICAgICAgb25DbG9zZT17aGFuZGxlRHJhd2VyVG9nZ2xlfVxyXG4gICAgICAgICAgTW9kYWxQcm9wcz17e1xyXG4gICAgICAgICAgICBrZWVwTW91bnRlZDogdHJ1ZSwgLy8gQmV0dGVyIG9wZW4gcGVyZm9ybWFuY2Ugb24gbW9iaWxlLlxyXG4gICAgICAgICAgfX1cclxuICAgICAgICAgIHN4PXt7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IHsgeHM6ICdibG9jaycsIG1kOiAnbm9uZScgfSxcclxuICAgICAgICAgICAgJyYgLk11aURyYXdlci1wYXBlcic6IHtcclxuICAgICAgICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcclxuICAgICAgICAgICAgICB3aWR0aDogRFJBV0VSX1dJRFRILFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7ZHJhd2VyfVxyXG4gICAgICAgIDwvRHJhd2VyPlxyXG5cclxuICAgICAgICB7LyogRGVza3RvcCBkcmF3ZXIgKi99XHJcbiAgICAgICAgPERyYXdlclxyXG4gICAgICAgICAgdmFyaWFudD1cInBlcm1hbmVudFwiXHJcbiAgICAgICAgICBzeD17e1xyXG4gICAgICAgICAgICBkaXNwbGF5OiB7IHhzOiAnbm9uZScsIG1kOiAnYmxvY2snIH0sXHJcbiAgICAgICAgICAgICcmIC5NdWlEcmF3ZXItcGFwZXInOiB7XHJcbiAgICAgICAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXHJcbiAgICAgICAgICAgICAgd2lkdGg6IERSQVdFUl9XSURUSCxcclxuICAgICAgICAgICAgICBib3JkZXJSaWdodDogYDFweCBzb2xpZCAke3RoZW1lLnBhbGV0dGUuZGl2aWRlcn1gLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICAgIG9wZW5cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7ZHJhd2VyfVxyXG4gICAgICAgIDwvRHJhd2VyPlxyXG4gICAgICA8L0JveD5cclxuXHJcbiAgICAgIHsvKiBNYWluIENvbnRlbnQgKi99XHJcbiAgICAgIDxCb3hcclxuICAgICAgICBjb21wb25lbnQ9XCJtYWluXCJcclxuICAgICAgICBzeD17e1xyXG4gICAgICAgICAgZmxleEdyb3c6IDEsXHJcbiAgICAgICAgICB3aWR0aDogeyBtZDogYGNhbGMoMTAwJSAtICR7RFJBV0VSX1dJRFRIfXB4KWAgfSxcclxuICAgICAgICAgIGhlaWdodDogJzEwMHZoJyxcclxuICAgICAgICAgIG92ZXJmbG93OiAnYXV0bycsXHJcbiAgICAgICAgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxUb29sYmFyIC8+IHsvKiBTcGFjZXIgZm9yIGZpeGVkIEFwcEJhciAqL31cclxuICAgICAgICA8Qm94IHN4PXt7IGZsZXg6IDEsIG1pbkhlaWdodDogJ2NhbGMoMTAwdmggLSA2NHB4KScgfX0+XHJcbiAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgIDwvQm94PlxyXG4gICAgPC9Cb3g+XHJcbiAgKTtcclxufSAiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIkJveCIsIkRyYXdlciIsIkFwcEJhciIsIlRvb2xiYXIiLCJUeXBvZ3JhcGh5IiwiTGlzdCIsIkxpc3RJdGVtIiwiTGlzdEl0ZW1CdXR0b24iLCJMaXN0SXRlbUljb24iLCJMaXN0SXRlbVRleHQiLCJJY29uQnV0dG9uIiwiQXZhdGFyIiwiTWVudSIsIk1lbnVJdGVtIiwiRGl2aWRlciIsIkNoaXAiLCJ1c2VUaGVtZSIsImFscGhhIiwiRGFzaGJvYXJkIiwiRGFzaGJvYXJkSWNvbiIsIlBlb3BsZSIsIlBlb3BsZUljb24iLCJDYW1wYWlnbiIsIkNhbXBhaWduSWNvbiIsIlRyZW5kaW5nVXAiLCJMZWFkSWNvbiIsIkJ1c2luZXNzIiwiQnVzaW5lc3NJY29uIiwiQXNzaWdubWVudCIsIlByb2plY3RJY29uIiwiU2V0dGluZ3MiLCJTZXR0aW5nc0ljb24iLCJOb3RpZmljYXRpb25zIiwiTm90aWZpY2F0aW9uc0ljb24iLCJNZW51SWNvbiIsIkFjY291bnRDaXJjbGUiLCJMb2dvdXQiLCJMb2dvdXRJY29uIiwidXNlUm91dGVyIiwiTGluayIsIkRSQVdFUl9XSURUSCIsIm5hdmlnYXRpb25JdGVtcyIsImxhYmVsIiwiaHJlZiIsImljb24iLCJkZXNjcmlwdGlvbiIsImJhZGdlIiwiQXBwTGF5b3V0IiwiY2hpbGRyZW4iLCJ0aXRsZSIsInJvdXRlciIsInRoZW1lIiwibW9iaWxlT3BlbiIsInNldE1vYmlsZU9wZW4iLCJ1c2VyTWVudUFuY2hvciIsInNldFVzZXJNZW51QW5jaG9yIiwiaGFuZGxlRHJhd2VyVG9nZ2xlIiwiaGFuZGxlVXNlck1lbnVPcGVuIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiaGFuZGxlVXNlck1lbnVDbG9zZSIsImlzQWN0aXZlUGF0aCIsInBhdGhuYW1lIiwic3RhcnRzV2l0aCIsImRyYXdlciIsInN4IiwiaGVpZ2h0IiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJwIiwiYm9yZGVyQm90dG9tIiwicGFsZXR0ZSIsImRpdmlkZXIiLCJ2YXJpYW50IiwiZm9udFdlaWdodCIsImNvbG9yIiwiZmxleCIsInB5IiwibWFwIiwiaXRlbSIsImRpc2FibGVQYWRkaW5nIiwibWIiLCJjb21wb25lbnQiLCJzZWxlY3RlZCIsIm14IiwiYm9yZGVyUmFkaXVzIiwiYmFja2dyb3VuZENvbG9yIiwicHJpbWFyeSIsIm1haW4iLCJhY3Rpb24iLCJob3ZlciIsIm1pbldpZHRoIiwic2Vjb25kYXJ5IiwicHJpbWFyeVR5cG9ncmFwaHlQcm9wcyIsImZvbnRTaXplIiwic2Vjb25kYXJ5VHlwb2dyYXBoeVByb3BzIiwic2l6ZSIsIm1sIiwiYm9yZGVyVG9wIiwicG9zaXRpb24iLCJ3aWR0aCIsIm1kIiwiYm94U2hhZG93IiwiYXJpYS1sYWJlbCIsImVkZ2UiLCJvbkNsaWNrIiwibXIiLCJub1dyYXAiLCJmbGV4R3JvdyIsImFsaWduSXRlbXMiLCJnYXAiLCJhbmNob3JFbCIsIm9wZW4iLCJCb29sZWFuIiwib25DbG9zZSIsIlBhcGVyUHJvcHMiLCJlbGV2YXRpb24iLCJtdCIsImZsZXhTaHJpbmsiLCJNb2RhbFByb3BzIiwia2VlcE1vdW50ZWQiLCJ4cyIsImJveFNpemluZyIsImJvcmRlclJpZ2h0Iiwib3ZlcmZsb3ciLCJtaW5IZWlnaHQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/components/Layout/AppLayout.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var _emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/react/jsx-dev-runtime */ \"@emotion/react/jsx-dev-runtime\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/styles */ \"(pages-dir-node)/./node_modules/@mui/material/node/styles/index.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/CssBaseline */ \"(pages-dir-node)/./node_modules/@mui/material/node/CssBaseline/index.js\");\n/* harmony import */ var _components_Layout_AppLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Layout/AppLayout */ \"(pages-dir-node)/./src/components/Layout/AppLayout.tsx\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__, _components_Layout_AppLayout__WEBPACK_IMPORTED_MODULE_2__]);\n([_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__, _components_Layout_AppLayout__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n// Temporarily disable date picker imports to fix startup issues\n// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';\n// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';\n\n// Create a theme instance\nconst theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__.createTheme)({\n    palette: {\n        mode: 'light',\n        primary: {\n            main: '#1976d2',\n            light: '#42a5f5',\n            dark: '#1565c0'\n        },\n        secondary: {\n            main: '#9c27b0'\n        },\n        background: {\n            default: '#f5f5f5',\n            paper: '#ffffff'\n        }\n    },\n    typography: {\n        fontFamily: '\"Roboto\", \"Helvetica\", \"Arial\", sans-serif',\n        h1: {\n            fontWeight: 600\n        },\n        h2: {\n            fontWeight: 600\n        },\n        h3: {\n            fontWeight: 600\n        },\n        h4: {\n            fontWeight: 600\n        },\n        h5: {\n            fontWeight: 600\n        },\n        h6: {\n            fontWeight: 600\n        }\n    },\n    shape: {\n        borderRadius: 8\n    },\n    components: {\n        MuiButton: {\n            styleOverrides: {\n                root: {\n                    textTransform: 'none',\n                    fontWeight: 600\n                }\n            }\n        },\n        MuiCard: {\n            styleOverrides: {\n                root: {\n                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',\n                    borderRadius: 12\n                }\n            }\n        },\n        MuiPaper: {\n            styleOverrides: {\n                root: {\n                    backgroundImage: 'none'\n                }\n            }\n        }\n    }\n});\n// Pages that don't need the layout (like login, 404, etc.)\nconst pagesWithoutLayout = [\n    '/login',\n    '/register',\n    '/404',\n    '/500'\n];\nfunction App({ Component, pageProps, router }) {\n    const showLayout = !pagesWithoutLayout.includes(router.pathname);\n    return /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__.ThemeProvider, {\n        theme: theme,\n        children: [\n            /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\pages\\\\_app.tsx\",\n                lineNumber: 88,\n                columnNumber: 9\n            }, this),\n            showLayout ? /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Layout_AppLayout__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                children: /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\pages\\\\_app.tsx\",\n                    lineNumber: 91,\n                    columnNumber: 13\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\pages\\\\_app.tsx\",\n                lineNumber: 90,\n                columnNumber: 11\n            }, this) : /*#__PURE__*/ (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\pages\\\\_app.tsx\",\n                lineNumber: 94,\n                columnNumber: 11\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Shon PC\\\\Desktop\\\\smart-home-crm\\\\src\\\\pages\\\\_app.tsx\",\n        lineNumber: 85,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFFd0M7QUFDZDtBQUNwRCxnRUFBZ0U7QUFDaEUsbUZBQW1GO0FBQ25GLHVFQUF1RTtBQUNoQjtBQUV2RCwwQkFBMEI7QUFDMUIsTUFBTUssUUFBUUgsaUVBQVdBLENBQUM7SUFDeEJJLFNBQVM7UUFDUEMsTUFBTTtRQUNOQyxTQUFTO1lBQ1BDLE1BQU07WUFDTkMsT0FBTztZQUNQQyxNQUFNO1FBQ1I7UUFDQUMsV0FBVztZQUNUSCxNQUFNO1FBQ1I7UUFDQUksWUFBWTtZQUNWQyxTQUFTO1lBQ1RDLE9BQU87UUFDVDtJQUNGO0lBQ0FDLFlBQVk7UUFDVkMsWUFBWTtRQUNaQyxJQUFJO1lBQ0ZDLFlBQVk7UUFDZDtRQUNBQyxJQUFJO1lBQ0ZELFlBQVk7UUFDZDtRQUNBRSxJQUFJO1lBQ0ZGLFlBQVk7UUFDZDtRQUNBRyxJQUFJO1lBQ0ZILFlBQVk7UUFDZDtRQUNBSSxJQUFJO1lBQ0ZKLFlBQVk7UUFDZDtRQUNBSyxJQUFJO1lBQ0ZMLFlBQVk7UUFDZDtJQUNGO0lBQ0FNLE9BQU87UUFDTEMsY0FBYztJQUNoQjtJQUNBQyxZQUFZO1FBQ1ZDLFdBQVc7WUFDVEMsZ0JBQWdCO2dCQUNkQyxNQUFNO29CQUNKQyxlQUFlO29CQUNmWixZQUFZO2dCQUNkO1lBQ0Y7UUFDRjtRQUNBYSxTQUFTO1lBQ1BILGdCQUFnQjtnQkFDZEMsTUFBTTtvQkFDSkcsV0FBVztvQkFDWFAsY0FBYztnQkFDaEI7WUFDRjtRQUNGO1FBQ0FRLFVBQVU7WUFDUkwsZ0JBQWdCO2dCQUNkQyxNQUFNO29CQUNKSyxpQkFBaUI7Z0JBQ25CO1lBQ0Y7UUFDRjtJQUNGO0FBQ0Y7QUFFQSwyREFBMkQ7QUFDM0QsTUFBTUMscUJBQXFCO0lBQUM7SUFBVTtJQUFhO0lBQVE7Q0FBTztBQUVuRCxTQUFTQyxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFQyxNQUFNLEVBQVk7SUFDcEUsTUFBTUMsYUFBYSxDQUFDTCxtQkFBbUJNLFFBQVEsQ0FBQ0YsT0FBT0csUUFBUTtJQUUvRCxxQkFDRSx1RUFBQzFDLCtEQUFhQTtRQUFDSSxPQUFPQTs7MEJBR2xCLHVFQUFDRixpRUFBV0E7Ozs7O1lBQ1hzQywyQkFDQyx1RUFBQ3JDLG9FQUFTQTswQkFDUixxRkFBQ2tDO29CQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7cUNBRzFCLHVFQUFDRDtnQkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7QUFLbEMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcU2hvbiBQQ1xcRGVza3RvcFxcc21hcnQtaG9tZS1jcm1cXHNyY1xccGFnZXNcXF9hcHAudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCc7XHJcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIsIGNyZWF0ZVRoZW1lIH0gZnJvbSAnQG11aS9tYXRlcmlhbC9zdHlsZXMnO1xyXG5pbXBvcnQgQ3NzQmFzZWxpbmUgZnJvbSAnQG11aS9tYXRlcmlhbC9Dc3NCYXNlbGluZSc7XHJcbi8vIFRlbXBvcmFyaWx5IGRpc2FibGUgZGF0ZSBwaWNrZXIgaW1wb3J0cyB0byBmaXggc3RhcnR1cCBpc3N1ZXNcclxuLy8gaW1wb3J0IHsgTG9jYWxpemF0aW9uUHJvdmlkZXIgfSBmcm9tICdAbXVpL3gtZGF0ZS1waWNrZXJzL0xvY2FsaXphdGlvblByb3ZpZGVyJztcclxuLy8gaW1wb3J0IHsgQWRhcHRlckRhdGVGbnMgfSBmcm9tICdAbXVpL3gtZGF0ZS1waWNrZXJzL0FkYXB0ZXJEYXRlRm5zJztcclxuaW1wb3J0IEFwcExheW91dCBmcm9tICcuLi9jb21wb25lbnRzL0xheW91dC9BcHBMYXlvdXQnO1xyXG5cclxuLy8gQ3JlYXRlIGEgdGhlbWUgaW5zdGFuY2VcclxuY29uc3QgdGhlbWUgPSBjcmVhdGVUaGVtZSh7XHJcbiAgcGFsZXR0ZToge1xyXG4gICAgbW9kZTogJ2xpZ2h0JyxcclxuICAgIHByaW1hcnk6IHtcclxuICAgICAgbWFpbjogJyMxOTc2ZDInLFxyXG4gICAgICBsaWdodDogJyM0MmE1ZjUnLFxyXG4gICAgICBkYXJrOiAnIzE1NjVjMCcsXHJcbiAgICB9LFxyXG4gICAgc2Vjb25kYXJ5OiB7XHJcbiAgICAgIG1haW46ICcjOWMyN2IwJyxcclxuICAgIH0sXHJcbiAgICBiYWNrZ3JvdW5kOiB7XHJcbiAgICAgIGRlZmF1bHQ6ICcjZjVmNWY1JyxcclxuICAgICAgcGFwZXI6ICcjZmZmZmZmJyxcclxuICAgIH0sXHJcbiAgfSxcclxuICB0eXBvZ3JhcGh5OiB7XHJcbiAgICBmb250RmFtaWx5OiAnXCJSb2JvdG9cIiwgXCJIZWx2ZXRpY2FcIiwgXCJBcmlhbFwiLCBzYW5zLXNlcmlmJyxcclxuICAgIGgxOiB7XHJcbiAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcclxuICAgIH0sXHJcbiAgICBoMjoge1xyXG4gICAgICBmb250V2VpZ2h0OiA2MDAsXHJcbiAgICB9LFxyXG4gICAgaDM6IHtcclxuICAgICAgZm9udFdlaWdodDogNjAwLFxyXG4gICAgfSxcclxuICAgIGg0OiB7XHJcbiAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcclxuICAgIH0sXHJcbiAgICBoNToge1xyXG4gICAgICBmb250V2VpZ2h0OiA2MDAsXHJcbiAgICB9LFxyXG4gICAgaDY6IHtcclxuICAgICAgZm9udFdlaWdodDogNjAwLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHNoYXBlOiB7XHJcbiAgICBib3JkZXJSYWRpdXM6IDgsXHJcbiAgfSxcclxuICBjb21wb25lbnRzOiB7XHJcbiAgICBNdWlCdXR0b246IHtcclxuICAgICAgc3R5bGVPdmVycmlkZXM6IHtcclxuICAgICAgICByb290OiB7XHJcbiAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiAnbm9uZScsXHJcbiAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBNdWlDYXJkOiB7XHJcbiAgICAgIHN0eWxlT3ZlcnJpZGVzOiB7XHJcbiAgICAgICAgcm9vdDoge1xyXG4gICAgICAgICAgYm94U2hhZG93OiAnMCAycHggOHB4IHJnYmEoMCwwLDAsMC4xKScsXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IDEyLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgTXVpUGFwZXI6IHtcclxuICAgICAgc3R5bGVPdmVycmlkZXM6IHtcclxuICAgICAgICByb290OiB7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICdub25lJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuXHJcbi8vIFBhZ2VzIHRoYXQgZG9uJ3QgbmVlZCB0aGUgbGF5b3V0IChsaWtlIGxvZ2luLCA0MDQsIGV0Yy4pXHJcbmNvbnN0IHBhZ2VzV2l0aG91dExheW91dCA9IFsnL2xvZ2luJywgJy9yZWdpc3RlcicsICcvNDA0JywgJy81MDAnXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzLCByb3V0ZXIgfTogQXBwUHJvcHMpIHtcclxuICBjb25zdCBzaG93TGF5b3V0ID0gIXBhZ2VzV2l0aG91dExheW91dC5pbmNsdWRlcyhyb3V0ZXIucGF0aG5hbWUpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cclxuICAgICAgey8qIFRlbXBvcmFyaWx5IGRpc2FibGUgTG9jYWxpemF0aW9uUHJvdmlkZXIgKi99XHJcbiAgICAgIHsvKiA8TG9jYWxpemF0aW9uUHJvdmlkZXIgZGF0ZUFkYXB0ZXI9e0FkYXB0ZXJEYXRlRm5zfT4gKi99XHJcbiAgICAgICAgPENzc0Jhc2VsaW5lIC8+XHJcbiAgICAgICAge3Nob3dMYXlvdXQgPyAoXHJcbiAgICAgICAgICA8QXBwTGF5b3V0PlxyXG4gICAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICAgICAgICA8L0FwcExheW91dD5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgICAgICl9XHJcbiAgICAgIHsvKiA8L0xvY2FsaXphdGlvblByb3ZpZGVyPiAqL31cclxuICAgIDwvVGhlbWVQcm92aWRlcj5cclxuICApO1xyXG59ICJdLCJuYW1lcyI6WyJSZWFjdCIsIlRoZW1lUHJvdmlkZXIiLCJjcmVhdGVUaGVtZSIsIkNzc0Jhc2VsaW5lIiwiQXBwTGF5b3V0IiwidGhlbWUiLCJwYWxldHRlIiwibW9kZSIsInByaW1hcnkiLCJtYWluIiwibGlnaHQiLCJkYXJrIiwic2Vjb25kYXJ5IiwiYmFja2dyb3VuZCIsImRlZmF1bHQiLCJwYXBlciIsInR5cG9ncmFwaHkiLCJmb250RmFtaWx5IiwiaDEiLCJmb250V2VpZ2h0IiwiaDIiLCJoMyIsImg0IiwiaDUiLCJoNiIsInNoYXBlIiwiYm9yZGVyUmFkaXVzIiwiY29tcG9uZW50cyIsIk11aUJ1dHRvbiIsInN0eWxlT3ZlcnJpZGVzIiwicm9vdCIsInRleHRUcmFuc2Zvcm0iLCJNdWlDYXJkIiwiYm94U2hhZG93IiwiTXVpUGFwZXIiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJwYWdlc1dpdGhvdXRMYXlvdXQiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJyb3V0ZXIiLCJzaG93TGF5b3V0IiwiaW5jbHVkZXMiLCJwYXRobmFtZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/pages/_app.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/__barrel_optimize__?names=AccountCircle,Assignment,Business,Campaign,Dashboard,Logout,Menu,Notifications,People,Settings,TrendingUp!=!./node_modules/@mui/icons-material/esm/index.js":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** __barrel_optimize__?names=AccountCircle,Assignment,Business,Campaign,Dashboard,Logout,Menu,Notifications,People,Settings,TrendingUp!=!./node_modules/@mui/icons-material/esm/index.js ***!
  \*********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AccountCircle: () => (/* reexport safe */ _AccountCircle_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   Assignment: () => (/* reexport safe */ _Assignment_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   Business: () => (/* reexport safe */ _Business_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   Campaign: () => (/* reexport safe */ _Campaign_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n/* harmony export */   Dashboard: () => (/* reexport safe */ _Dashboard_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]),\n/* harmony export */   Logout: () => (/* reexport safe */ _Logout_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]),\n/* harmony export */   Menu: () => (/* reexport safe */ _Menu_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]),\n/* harmony export */   Notifications: () => (/* reexport safe */ _Notifications_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]),\n/* harmony export */   People: () => (/* reexport safe */ _People_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]),\n/* harmony export */   Settings: () => (/* reexport safe */ _Settings_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]),\n/* harmony export */   TrendingUp: () => (/* reexport safe */ _TrendingUp_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _AccountCircle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AccountCircle.js */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/AccountCircle.js\");\n/* harmony import */ var _Assignment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Assignment.js */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/Assignment.js\");\n/* harmony import */ var _Business_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Business.js */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/Business.js\");\n/* harmony import */ var _Campaign_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Campaign.js */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/Campaign.js\");\n/* harmony import */ var _Dashboard_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Dashboard.js */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/Dashboard.js\");\n/* harmony import */ var _Logout_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Logout.js */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/Logout.js\");\n/* harmony import */ var _Menu_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Menu.js */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/Menu.js\");\n/* harmony import */ var _Notifications_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Notifications.js */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/Notifications.js\");\n/* harmony import */ var _People_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./People.js */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/People.js\");\n/* harmony import */ var _Settings_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Settings.js */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/Settings.js\");\n/* harmony import */ var _TrendingUp_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./TrendingUp.js */ \"(pages-dir-node)/./node_modules/@mui/icons-material/esm/TrendingUp.js\");\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS9fX2JhcnJlbF9vcHRpbWl6ZV9fP25hbWVzPUFjY291bnRDaXJjbGUsQXNzaWdubWVudCxCdXNpbmVzcyxDYW1wYWlnbixEYXNoYm9hcmQsTG9nb3V0LE1lbnUsTm90aWZpY2F0aW9ucyxQZW9wbGUsU2V0dGluZ3MsVHJlbmRpbmdVcCE9IS4vbm9kZV9tb2R1bGVzL0BtdWkvaWNvbnMtbWF0ZXJpYWwvZXNtL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQzZEO0FBQ047QUFDSjtBQUNBO0FBQ0U7QUFDTjtBQUNKO0FBQ2tCO0FBQ2Q7QUFDSSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxTaG9uIFBDXFxEZXNrdG9wXFxzbWFydC1ob21lLWNybVxcbm9kZV9tb2R1bGVzXFxAbXVpXFxpY29ucy1tYXRlcmlhbFxcZXNtXFxpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQWNjb3VudENpcmNsZSB9IGZyb20gXCIuL0FjY291bnRDaXJjbGUuanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBBc3NpZ25tZW50IH0gZnJvbSBcIi4vQXNzaWdubWVudC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIEJ1c2luZXNzIH0gZnJvbSBcIi4vQnVzaW5lc3MuanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBDYW1wYWlnbiB9IGZyb20gXCIuL0NhbXBhaWduLmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRGFzaGJvYXJkIH0gZnJvbSBcIi4vRGFzaGJvYXJkLmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTG9nb3V0IH0gZnJvbSBcIi4vTG9nb3V0LmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWVudSB9IGZyb20gXCIuL01lbnUuanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBOb3RpZmljYXRpb25zIH0gZnJvbSBcIi4vTm90aWZpY2F0aW9ucy5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBlb3BsZSB9IGZyb20gXCIuL1Blb3BsZS5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIFNldHRpbmdzIH0gZnJvbSBcIi4vU2V0dGluZ3MuanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBUcmVuZGluZ1VwIH0gZnJvbSBcIi4vVHJlbmRpbmdVcC5qc1wiIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/__barrel_optimize__?names=AccountCircle,Assignment,Business,Campaign,Dashboard,Logout,Menu,Notifications,People,Settings,TrendingUp!=!./node_modules/@mui/icons-material/esm/index.js\n");

/***/ }),

/***/ "(pages-dir-node)/__barrel_optimize__?names=AppBar,Avatar,Box,Chip,Divider,Drawer,IconButton,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Menu,MenuItem,Toolbar,Typography,alpha,useTheme!=!./node_modules/@mui/material/index.js":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** __barrel_optimize__?names=AppBar,Avatar,Box,Chip,Divider,Drawer,IconButton,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Menu,MenuItem,Toolbar,Typography,alpha,useTheme!=!./node_modules/@mui/material/index.js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AppBar: () => (/* reexport safe */ _AppBar_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   Avatar: () => (/* reexport safe */ _Avatar_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   Box: () => (/* reexport safe */ _Box_index_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   Chip: () => (/* reexport safe */ _Chip_index_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n/* harmony export */   Divider: () => (/* reexport safe */ _Divider_index_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]),\n/* harmony export */   Drawer: () => (/* reexport safe */ _Drawer_index_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]),\n/* harmony export */   IconButton: () => (/* reexport safe */ _IconButton_index_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]),\n/* harmony export */   List: () => (/* reexport safe */ _List_index_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]),\n/* harmony export */   ListItem: () => (/* reexport safe */ _ListItem_index_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]),\n/* harmony export */   ListItemButton: () => (/* reexport safe */ _ListItemButton_index_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]),\n/* harmony export */   ListItemIcon: () => (/* reexport safe */ _ListItemIcon_index_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]),\n/* harmony export */   ListItemText: () => (/* reexport safe */ _ListItemText_index_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]),\n/* harmony export */   Menu: () => (/* reexport safe */ _Menu_index_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"]),\n/* harmony export */   MenuItem: () => (/* reexport safe */ _MenuItem_index_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"]),\n/* harmony export */   Toolbar: () => (/* reexport safe */ _Toolbar_index_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"]),\n/* harmony export */   Typography: () => (/* reexport safe */ _Typography_index_js__WEBPACK_IMPORTED_MODULE_15__[\"default\"]),\n/* harmony export */   alpha: () => (/* reexport safe */ C_Users_Shon_PC_Desktop_smart_home_crm_node_modules_mui_material_styles_index_js__WEBPACK_IMPORTED_MODULE_16__.alpha),\n/* harmony export */   useTheme: () => (/* reexport safe */ C_Users_Shon_PC_Desktop_smart_home_crm_node_modules_mui_material_styles_index_js__WEBPACK_IMPORTED_MODULE_16__.useTheme)\n/* harmony export */ });\n/* harmony import */ var _AppBar_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppBar/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/AppBar/index.js\");\n/* harmony import */ var _Avatar_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Avatar/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/Avatar/index.js\");\n/* harmony import */ var _Box_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Box/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/Box/index.js\");\n/* harmony import */ var _Chip_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Chip/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/Chip/index.js\");\n/* harmony import */ var _Divider_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Divider/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/Divider/index.js\");\n/* harmony import */ var _Drawer_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Drawer/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/Drawer/index.js\");\n/* harmony import */ var _IconButton_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./IconButton/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/IconButton/index.js\");\n/* harmony import */ var _List_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./List/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/List/index.js\");\n/* harmony import */ var _ListItem_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ListItem/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/ListItem/index.js\");\n/* harmony import */ var _ListItemButton_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ListItemButton/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/ListItemButton/index.js\");\n/* harmony import */ var _ListItemIcon_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ListItemIcon/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/ListItemIcon/index.js\");\n/* harmony import */ var _ListItemText_index_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ListItemText/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/ListItemText/index.js\");\n/* harmony import */ var _Menu_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Menu/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/Menu/index.js\");\n/* harmony import */ var _MenuItem_index_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./MenuItem/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/MenuItem/index.js\");\n/* harmony import */ var _Toolbar_index_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Toolbar/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/Toolbar/index.js\");\n/* harmony import */ var _Typography_index_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Typography/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/Typography/index.js\");\n/* harmony import */ var C_Users_Shon_PC_Desktop_smart_home_crm_node_modules_mui_material_styles_index_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./node_modules/@mui/material/styles/index.js */ \"(pages-dir-node)/./node_modules/@mui/material/styles/index.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_AppBar_index_js__WEBPACK_IMPORTED_MODULE_0__, _Avatar_index_js__WEBPACK_IMPORTED_MODULE_1__, _Box_index_js__WEBPACK_IMPORTED_MODULE_2__, _Chip_index_js__WEBPACK_IMPORTED_MODULE_3__, _Divider_index_js__WEBPACK_IMPORTED_MODULE_4__, _Drawer_index_js__WEBPACK_IMPORTED_MODULE_5__, _IconButton_index_js__WEBPACK_IMPORTED_MODULE_6__, _List_index_js__WEBPACK_IMPORTED_MODULE_7__, _ListItem_index_js__WEBPACK_IMPORTED_MODULE_8__, _ListItemButton_index_js__WEBPACK_IMPORTED_MODULE_9__, _ListItemIcon_index_js__WEBPACK_IMPORTED_MODULE_10__, _ListItemText_index_js__WEBPACK_IMPORTED_MODULE_11__, _Menu_index_js__WEBPACK_IMPORTED_MODULE_12__, _MenuItem_index_js__WEBPACK_IMPORTED_MODULE_13__, _Toolbar_index_js__WEBPACK_IMPORTED_MODULE_14__, _Typography_index_js__WEBPACK_IMPORTED_MODULE_15__, C_Users_Shon_PC_Desktop_smart_home_crm_node_modules_mui_material_styles_index_js__WEBPACK_IMPORTED_MODULE_16__]);\n([_AppBar_index_js__WEBPACK_IMPORTED_MODULE_0__, _Avatar_index_js__WEBPACK_IMPORTED_MODULE_1__, _Box_index_js__WEBPACK_IMPORTED_MODULE_2__, _Chip_index_js__WEBPACK_IMPORTED_MODULE_3__, _Divider_index_js__WEBPACK_IMPORTED_MODULE_4__, _Drawer_index_js__WEBPACK_IMPORTED_MODULE_5__, _IconButton_index_js__WEBPACK_IMPORTED_MODULE_6__, _List_index_js__WEBPACK_IMPORTED_MODULE_7__, _ListItem_index_js__WEBPACK_IMPORTED_MODULE_8__, _ListItemButton_index_js__WEBPACK_IMPORTED_MODULE_9__, _ListItemIcon_index_js__WEBPACK_IMPORTED_MODULE_10__, _ListItemText_index_js__WEBPACK_IMPORTED_MODULE_11__, _Menu_index_js__WEBPACK_IMPORTED_MODULE_12__, _MenuItem_index_js__WEBPACK_IMPORTED_MODULE_13__, _Toolbar_index_js__WEBPACK_IMPORTED_MODULE_14__, _Typography_index_js__WEBPACK_IMPORTED_MODULE_15__, C_Users_Shon_PC_Desktop_smart_home_crm_node_modules_mui_material_styles_index_js__WEBPACK_IMPORTED_MODULE_16__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS9fX2JhcnJlbF9vcHRpbWl6ZV9fP25hbWVzPUFwcEJhcixBdmF0YXIsQm94LENoaXAsRGl2aWRlcixEcmF3ZXIsSWNvbkJ1dHRvbixMaXN0LExpc3RJdGVtLExpc3RJdGVtQnV0dG9uLExpc3RJdGVtSWNvbixMaXN0SXRlbVRleHQsTWVudSxNZW51SXRlbSxUb29sYmFyLFR5cG9ncmFwaHksYWxwaGEsdXNlVGhlbWUhPSEuL25vZGVfbW9kdWxlcy9AbXVpL21hdGVyaWFsL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNxRDtBQUNBO0FBQ047QUFDRTtBQUNNO0FBQ0Y7QUFDUTtBQUNaO0FBQ1E7QUFDWTtBQUNKO0FBQ0E7QUFDaEI7QUFDUTtBQUNGO0FBQ007QUFDc0QiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcU2hvbiBQQ1xcRGVza3RvcFxcc21hcnQtaG9tZS1jcm1cXG5vZGVfbW9kdWxlc1xcQG11aVxcbWF0ZXJpYWxcXGluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBBcHBCYXIgfSBmcm9tIFwiLi9BcHBCYXIvaW5kZXguanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBBdmF0YXIgfSBmcm9tIFwiLi9BdmF0YXIvaW5kZXguanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBCb3ggfSBmcm9tIFwiLi9Cb3gvaW5kZXguanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBDaGlwIH0gZnJvbSBcIi4vQ2hpcC9pbmRleC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIERpdmlkZXIgfSBmcm9tIFwiLi9EaXZpZGVyL2luZGV4LmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRHJhd2VyIH0gZnJvbSBcIi4vRHJhd2VyL2luZGV4LmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSWNvbkJ1dHRvbiB9IGZyb20gXCIuL0ljb25CdXR0b24vaW5kZXguanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBMaXN0IH0gZnJvbSBcIi4vTGlzdC9pbmRleC5qc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIExpc3RJdGVtIH0gZnJvbSBcIi4vTGlzdEl0ZW0vaW5kZXguanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBMaXN0SXRlbUJ1dHRvbiB9IGZyb20gXCIuL0xpc3RJdGVtQnV0dG9uL2luZGV4LmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTGlzdEl0ZW1JY29uIH0gZnJvbSBcIi4vTGlzdEl0ZW1JY29uL2luZGV4LmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTGlzdEl0ZW1UZXh0IH0gZnJvbSBcIi4vTGlzdEl0ZW1UZXh0L2luZGV4LmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWVudSB9IGZyb20gXCIuL01lbnUvaW5kZXguanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBNZW51SXRlbSB9IGZyb20gXCIuL01lbnVJdGVtL2luZGV4LmpzXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVG9vbGJhciB9IGZyb20gXCIuL1Rvb2xiYXIvaW5kZXguanNcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBUeXBvZ3JhcGh5IH0gZnJvbSBcIi4vVHlwb2dyYXBoeS9pbmRleC5qc1wiXG5leHBvcnQgeyBhbHBoYSB9IGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxTaG9uIFBDXFxcXERlc2t0b3BcXFxcc21hcnQtaG9tZS1jcm1cXFxcbm9kZV9tb2R1bGVzXFxcXEBtdWlcXFxcbWF0ZXJpYWxcXFxcc3R5bGVzXFxcXGluZGV4LmpzXCJcbmV4cG9ydCB7IHVzZVRoZW1lIH0gZnJvbSBcIkM6XFxcXFVzZXJzXFxcXFNob24gUENcXFxcRGVza3RvcFxcXFxzbWFydC1ob21lLWNybVxcXFxub2RlX21vZHVsZXNcXFxcQG11aVxcXFxtYXRlcmlhbFxcXFxzdHlsZXNcXFxcaW5kZXguanNcIiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/__barrel_optimize__?names=AppBar,Avatar,Box,Chip,Divider,Drawer,IconButton,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Menu,MenuItem,Toolbar,Typography,alpha,useTheme!=!./node_modules/@mui/material/index.js\n");

/***/ }),

/***/ "@emotion/cache":
/*!*********************************!*\
  !*** external "@emotion/cache" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@emotion/cache");

/***/ }),

/***/ "@emotion/react":
/*!*********************************!*\
  !*** external "@emotion/react" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@emotion/react");

/***/ }),

/***/ "@emotion/react/jsx-dev-runtime":
/*!*************************************************!*\
  !*** external "@emotion/react/jsx-dev-runtime" ***!
  \*************************************************/
/***/ ((module) => {

module.exports = import("@emotion/react/jsx-dev-runtime");;

/***/ }),

/***/ "@emotion/serialize":
/*!*************************************!*\
  !*** external "@emotion/serialize" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@emotion/serialize");

/***/ }),

/***/ "@emotion/sheet":
/*!*********************************!*\
  !*** external "@emotion/sheet" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@emotion/sheet");

/***/ }),

/***/ "@emotion/styled":
/*!**********************************!*\
  !*** external "@emotion/styled" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@emotion/styled");

/***/ }),

/***/ "@mui/system/DefaultPropsProvider":
/*!***************************************************!*\
  !*** external "@mui/system/DefaultPropsProvider" ***!
  \***************************************************/
/***/ ((module) => {

module.exports = import("@mui/system/DefaultPropsProvider");;

/***/ }),

/***/ "@mui/system/InitColorSchemeScript":
/*!****************************************************!*\
  !*** external "@mui/system/InitColorSchemeScript" ***!
  \****************************************************/
/***/ ((module) => {

module.exports = import("@mui/system/InitColorSchemeScript");;

/***/ }),

/***/ "@mui/system/RtlProvider":
/*!******************************************!*\
  !*** external "@mui/system/RtlProvider" ***!
  \******************************************/
/***/ ((module) => {

module.exports = import("@mui/system/RtlProvider");;

/***/ }),

/***/ "@mui/system/colorManipulator":
/*!***********************************************!*\
  !*** external "@mui/system/colorManipulator" ***!
  \***********************************************/
/***/ ((module) => {

module.exports = import("@mui/system/colorManipulator");;

/***/ }),

/***/ "@mui/system/createBreakpoints":
/*!************************************************!*\
  !*** external "@mui/system/createBreakpoints" ***!
  \************************************************/
/***/ ((module) => {

module.exports = import("@mui/system/createBreakpoints");;

/***/ }),

/***/ "@mui/system/createStyled":
/*!*******************************************!*\
  !*** external "@mui/system/createStyled" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = import("@mui/system/createStyled");;

/***/ }),

/***/ "@mui/system/createTheme":
/*!******************************************!*\
  !*** external "@mui/system/createTheme" ***!
  \******************************************/
/***/ ((module) => {

module.exports = import("@mui/system/createTheme");;

/***/ }),

/***/ "@mui/system/cssVars":
/*!**************************************!*\
  !*** external "@mui/system/cssVars" ***!
  \**************************************/
/***/ ((module) => {

module.exports = import("@mui/system/cssVars");;

/***/ }),

/***/ "@mui/system/spacing":
/*!**************************************!*\
  !*** external "@mui/system/spacing" ***!
  \**************************************/
/***/ ((module) => {

module.exports = import("@mui/system/spacing");;

/***/ }),

/***/ "@mui/system/styleFunctionSx":
/*!**********************************************!*\
  !*** external "@mui/system/styleFunctionSx" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = import("@mui/system/styleFunctionSx");;

/***/ }),

/***/ "@mui/system/useThemeProps":
/*!********************************************!*\
  !*** external "@mui/system/useThemeProps" ***!
  \********************************************/
/***/ ((module) => {

module.exports = import("@mui/system/useThemeProps");;

/***/ }),

/***/ "@mui/utils":
/*!*****************************!*\
  !*** external "@mui/utils" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("@mui/utils");

/***/ }),

/***/ "@mui/utils/ClassNameGenerator":
/*!************************************************!*\
  !*** external "@mui/utils/ClassNameGenerator" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/ClassNameGenerator");

/***/ }),

/***/ "@mui/utils/HTMLElementType":
/*!*********************************************!*\
  !*** external "@mui/utils/HTMLElementType" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/HTMLElementType");

/***/ }),

/***/ "@mui/utils/appendOwnerState":
/*!**********************************************!*\
  !*** external "@mui/utils/appendOwnerState" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/appendOwnerState");

/***/ }),

/***/ "@mui/utils/capitalize":
/*!****************************************!*\
  !*** external "@mui/utils/capitalize" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/capitalize");

/***/ }),

/***/ "@mui/utils/chainPropTypes":
/*!********************************************!*\
  !*** external "@mui/utils/chainPropTypes" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/chainPropTypes");

/***/ }),

/***/ "@mui/utils/clamp":
/*!***********************************!*\
  !*** external "@mui/utils/clamp" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@mui/utils/clamp");

/***/ }),

/***/ "@mui/utils/composeClasses":
/*!********************************************!*\
  !*** external "@mui/utils/composeClasses" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/composeClasses");

/***/ }),

/***/ "@mui/utils/createChainedFunction":
/*!***************************************************!*\
  !*** external "@mui/utils/createChainedFunction" ***!
  \***************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/createChainedFunction");

/***/ }),

/***/ "@mui/utils/debounce":
/*!**************************************!*\
  !*** external "@mui/utils/debounce" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/debounce");

/***/ }),

/***/ "@mui/utils/deepmerge":
/*!***************************************!*\
  !*** external "@mui/utils/deepmerge" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/deepmerge");

/***/ }),

/***/ "@mui/utils/deprecatedPropType":
/*!************************************************!*\
  !*** external "@mui/utils/deprecatedPropType" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/deprecatedPropType");

/***/ }),

/***/ "@mui/utils/elementAcceptingRef":
/*!*************************************************!*\
  !*** external "@mui/utils/elementAcceptingRef" ***!
  \*************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/elementAcceptingRef");

/***/ }),

/***/ "@mui/utils/elementTypeAcceptingRef":
/*!*****************************************************!*\
  !*** external "@mui/utils/elementTypeAcceptingRef" ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/elementTypeAcceptingRef");

/***/ }),

/***/ "@mui/utils/exactProp":
/*!***************************************!*\
  !*** external "@mui/utils/exactProp" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/exactProp");

/***/ }),

/***/ "@mui/utils/extractEventHandlers":
/*!**************************************************!*\
  !*** external "@mui/utils/extractEventHandlers" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/extractEventHandlers");

/***/ }),

/***/ "@mui/utils/formatMuiErrorMessage":
/*!***************************************************!*\
  !*** external "@mui/utils/formatMuiErrorMessage" ***!
  \***************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/formatMuiErrorMessage");

/***/ }),

/***/ "@mui/utils/generateUtilityClass":
/*!**************************************************!*\
  !*** external "@mui/utils/generateUtilityClass" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/generateUtilityClass");

/***/ }),

/***/ "@mui/utils/generateUtilityClasses":
/*!****************************************************!*\
  !*** external "@mui/utils/generateUtilityClasses" ***!
  \****************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/generateUtilityClasses");

/***/ }),

/***/ "@mui/utils/getDisplayName":
/*!********************************************!*\
  !*** external "@mui/utils/getDisplayName" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/getDisplayName");

/***/ }),

/***/ "@mui/utils/getReactElementRef":
/*!************************************************!*\
  !*** external "@mui/utils/getReactElementRef" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/getReactElementRef");

/***/ }),

/***/ "@mui/utils/getScrollbarSize":
/*!**********************************************!*\
  !*** external "@mui/utils/getScrollbarSize" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/getScrollbarSize");

/***/ }),

/***/ "@mui/utils/integerPropType":
/*!*********************************************!*\
  !*** external "@mui/utils/integerPropType" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/integerPropType");

/***/ }),

/***/ "@mui/utils/isFocusVisible":
/*!********************************************!*\
  !*** external "@mui/utils/isFocusVisible" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/isFocusVisible");

/***/ }),

/***/ "@mui/utils/isMuiElement":
/*!******************************************!*\
  !*** external "@mui/utils/isMuiElement" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/isMuiElement");

/***/ }),

/***/ "@mui/utils/mergeSlotProps":
/*!********************************************!*\
  !*** external "@mui/utils/mergeSlotProps" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/mergeSlotProps");

/***/ }),

/***/ "@mui/utils/ownerDocument":
/*!*******************************************!*\
  !*** external "@mui/utils/ownerDocument" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/ownerDocument");

/***/ }),

/***/ "@mui/utils/ownerWindow":
/*!*****************************************!*\
  !*** external "@mui/utils/ownerWindow" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/ownerWindow");

/***/ }),

/***/ "@mui/utils/refType":
/*!*************************************!*\
  !*** external "@mui/utils/refType" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/refType");

/***/ }),

/***/ "@mui/utils/requirePropFactory":
/*!************************************************!*\
  !*** external "@mui/utils/requirePropFactory" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/requirePropFactory");

/***/ }),

/***/ "@mui/utils/resolveComponentProps":
/*!***************************************************!*\
  !*** external "@mui/utils/resolveComponentProps" ***!
  \***************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/resolveComponentProps");

/***/ }),

/***/ "@mui/utils/resolveProps":
/*!******************************************!*\
  !*** external "@mui/utils/resolveProps" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/resolveProps");

/***/ }),

/***/ "@mui/utils/setRef":
/*!************************************!*\
  !*** external "@mui/utils/setRef" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/setRef");

/***/ }),

/***/ "@mui/utils/unsupportedProp":
/*!*********************************************!*\
  !*** external "@mui/utils/unsupportedProp" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/unsupportedProp");

/***/ }),

/***/ "@mui/utils/useControlled":
/*!*******************************************!*\
  !*** external "@mui/utils/useControlled" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useControlled");

/***/ }),

/***/ "@mui/utils/useEnhancedEffect":
/*!***********************************************!*\
  !*** external "@mui/utils/useEnhancedEffect" ***!
  \***********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useEnhancedEffect");

/***/ }),

/***/ "@mui/utils/useEventCallback":
/*!**********************************************!*\
  !*** external "@mui/utils/useEventCallback" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useEventCallback");

/***/ }),

/***/ "@mui/utils/useForkRef":
/*!****************************************!*\
  !*** external "@mui/utils/useForkRef" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useForkRef");

/***/ }),

/***/ "@mui/utils/useId":
/*!***********************************!*\
  !*** external "@mui/utils/useId" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useId");

/***/ }),

/***/ "@mui/utils/useLazyRef":
/*!****************************************!*\
  !*** external "@mui/utils/useLazyRef" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useLazyRef");

/***/ }),

/***/ "@mui/utils/useSlotProps":
/*!******************************************!*\
  !*** external "@mui/utils/useSlotProps" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useSlotProps");

/***/ }),

/***/ "@mui/utils/useTimeout":
/*!****************************************!*\
  !*** external "@mui/utils/useTimeout" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useTimeout");

/***/ }),

/***/ "clsx?9dfb":
/*!***********************!*\
  !*** external "clsx" ***!
  \***********************/
/***/ ((module) => {

module.exports = import("clsx");;

/***/ }),

/***/ "clsx?ce27":
/*!***********************!*\
  !*** external "clsx" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("clsx");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ "react-is":
/*!***************************!*\
  !*** external "react-is" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("react-is");

/***/ }),

/***/ "react-transition-group":
/*!*****************************************!*\
  !*** external "react-transition-group" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("react-transition-group");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/@mui","vendor-chunks/@babel"], () => (__webpack_exec__("(pages-dir-node)/./src/pages/_app.tsx")));
module.exports = __webpack_exports__;

})();