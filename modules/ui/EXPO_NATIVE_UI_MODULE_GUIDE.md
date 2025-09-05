# Expo Local Module with Jetpack Compose and SwiftUI Integration Guide

This guide provides a comprehensive walkthrough for creating an Expo local module that exports native UI components using Jetpack Compose (Android) and SwiftUI (iOS). The module will allow you to create reusable native UI components that can be consumed in your React Native/Expo application.

## Prerequisites

- Expo SDK 51+ (with Expo Modules API)
- Android Studio with Kotlin support
- Xcode with SwiftUI support
- Basic knowledge of React Native, Kotlin, and Swift

## Project Structure

Create the following directory structure for your Expo module:

```
my-native-ui-module/
├── android/
│   ├── build.gradle
│   └── src/main/java/com/mymodule/ui/
│       ├── MyNativeUIModule.kt
│       ├── components/
│       │   ├── MyButton.kt
│       │   ├── MyCard.kt
│       │   └── MyList.kt
│       └── modifiers/
│           └── ModifierExtensions.kt
├── ios/
│   ├── MyNativeUIModule.swift
│   ├── Components/
│   │   ├── MyButton.swift
│   │   ├── MyCard.swift
│   │   └── MyList.swift
│   └── Modifiers/
│       └── ViewModifiers.swift
├── src/
│   ├── index.ts
│   ├── types.ts
│   └── components/
│       ├── MyButton.tsx
│       ├── MyCard.tsx
│       └── MyList.tsx
├── expo-module.config.json
├── package.json
└── README.md
```

## 1. Module Configuration

### expo-module.config.json
```json
{
  "platforms": ["apple", "android"],
  "coreFeatures": ["swiftui", "compose"],
  "apple": {
    "modules": ["MyNativeUIModule"]
  },
  "android": {
    "modules": ["com.mymodule.ui.MyNativeUIModule"]
  }
}
```

### package.json
```json
{
  "name": "my-native-ui-module",
  "version": "1.0.0",
  "description": "Native UI components using Jetpack Compose and SwiftUI",
  "main": "build/index.js",
  "types": "build/index.d.ts",
  "scripts": {
    "build": "expo-module build",
    "clean": "expo-module clean",
    "lint": "expo-module lint",
    "test": "expo-module test",
    "prepare": "expo-module prepare",
    "prepublishOnly": "expo-module prepublishOnly"
  },
  "keywords": ["expo", "react-native", "ui", "compose", "swiftui"],
  "license": "MIT",
  "devDependencies": {
    "expo-module-scripts": "^3.0.0"
  },
  "peerDependencies": {
    "expo": "*",
    "react": "*",
    "react-native": "*"
  }
}
```

## 2. Android Implementation (Jetpack Compose)

### android/build.gradle
```gradle
buildscript {
  repositories {
    mavenCentral()
  }
  dependencies {
    classpath("org.jetbrains.kotlin.plugin.compose:org.jetbrains.kotlin.plugin.compose.gradle.plugin:${kotlinVersion}")
  }
}

apply plugin: 'com.android.library'
apply plugin: 'expo-module-gradle-plugin'
apply plugin: 'org.jetbrains.kotlin.plugin.compose'

android {
  namespace "com.mymodule.ui"
  defaultConfig {
    versionCode 1
    versionName "1.0.0"
  }
  buildFeatures {
    compose true
  }
  compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
  }
  kotlinOptions {
    jvmTarget = "1.8"
  }
}

dependencies {
  implementation 'androidx.compose.ui:ui:1.7.6'
  implementation 'androidx.compose.ui:ui-tooling-preview:1.7.6'
  implementation 'androidx.compose.foundation:foundation:1.7.6'
  implementation 'androidx.compose.material3:material3:1.3.1'
  implementation 'androidx.activity:activity-compose:1.9.3'
  implementation 'androidx.lifecycle:lifecycle-runtime-compose:2.8.7'
}
```

### android/src/main/java/com/mymodule/ui/MyNativeUIModule.kt
```kotlin
package com.mymodule.ui

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.unit.dp
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.jni.JavaScriptFunction
import com.mymodule.ui.components.MyButton
import com.mymodule.ui.components.MyCard
import com.mymodule.ui.components.MyList

class MyNativeUIModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("MyNativeUI")

    // Register your custom views
    View(MyButton::class) {
      Events("onButtonPress")
    }

    View(MyCard::class) {
      Events("onCardPress")
    }

    View(MyList::class) {
      Events("onItemPress", "onItemLongPress")
    }

    // Modifier functions that return ExpoModifier instances
    Function("padding") { all: Int ->
      return@Function ExpoModifier(Modifier.padding(all.dp))
    }

    Function("size") { width: Int, height: Int ->
      return@Function ExpoModifier(Modifier.size(width.dp, height.dp))
    }

    Function("background") { color: String ->
      return@Function ExpoModifier(Modifier.background(parseColor(color)))
    }

    Function("border") { borderWidth: Int, borderColor: String ->
      return@Function ExpoModifier(
        Modifier.border(BorderStroke(borderWidth.dp, parseColor(borderColor)))
      )
    }

    Function("shadow") { elevation: Int ->
      return@Function ExpoModifier(Modifier.shadow(elevation.dp))
    }

    Function("alpha") { alpha: Float ->
      return@Function ExpoModifier(Modifier.alpha(alpha))
    }

    Function("clickable") { callback: JavaScriptFunction<Any?> ->
      return@Function ExpoModifier(
        Modifier.clickable(
          onClick = {
            appContext.executeOnJavaScriptThread {
              callback.invoke()
            }
          }
        )
      )
    }
  }

  private fun parseColor(colorString: String): androidx.compose.ui.graphics.Color {
    return androidx.compose.ui.graphics.Color(android.graphics.Color.parseColor(colorString))
  }
}

// ExpoModifier wrapper class
data class ExpoModifier(val modifier: Modifier)
```

### android/src/main/java/com/mymodule/ui/components/MyButton.kt
```kotlin
package com.mymodule.ui.components

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import expo.modules.kotlin.viewmodels.ExpoView
import expo.modules.kotlin.views.ExpoView

class MyButton(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private var text by Prop("")
  private var variant by Prop("default")
  private var disabled by Prop(false)
  private var backgroundColor by Prop<String?>(null)
  private var textColor by Prop<String?>(null)
  private val onButtonPress by EventDispatcher()

  @OptIn(ExperimentalComposeUiApi::class)
  override val composable: @Composable () -> Unit = {
    Button(
      onClick = { onButtonPress(mapOf<String, Any>()) },
      enabled = !disabled,
      colors = ButtonDefaults.buttonColors(
        containerColor = backgroundColor?.let { Color(android.graphics.Color.parseColor(it)) } ?: ButtonDefaults.buttonColors().containerColor,
        contentColor = textColor?.let { Color(android.graphics.Color.parseColor(it)) } ?: ButtonDefaults.buttonColors().contentColor
      ),
      contentPadding = PaddingValues(16.dp)
    ) {
      Text(text = text)
    }
  }
}
```

### android/src/main/java/com/mymodule/ui/components/MyCard.kt
```kotlin
package com.mymodule.ui.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import expo.modules.kotlin.views.ExpoView

class MyCard(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private var title by Prop("")
  private var subtitle by Prop("")
  private var elevation by Prop(4)
  private val onCardPress by EventDispatcher()

  @OptIn(ExperimentalComposeUiApi::class)
  override val composable: @Composable () -> Unit = {
    Card(
      modifier = Modifier
        .fillMaxWidth()
        .clickable { onCardPress(mapOf<String, Any>()) },
      elevation = CardDefaults.cardElevation(defaultElevation = elevation.dp)
    ) {
      Column(
        modifier = Modifier.padding(16.dp)
      ) {
        Text(
          text = title,
          style = MaterialTheme.typography.headlineSmall
        )
        if (subtitle.isNotEmpty()) {
          Spacer(modifier = Modifier.height(8.dp))
          Text(
            text = subtitle,
            style = MaterialTheme.typography.bodyMedium
          )
        }
      }
    }
  }
}
```

## 3. iOS Implementation (SwiftUI)

### ios/MyNativeUIModule.swift
```swift
import ExpoModulesCore
import SwiftUI

public final class MyNativeUIModule: Module {
  public func definition() -> ModuleDefinition {
    Name("MyNativeUI")

    OnDestroy {
      // Cleanup if needed
    }

    // Register your SwiftUI views
    View(MyButton.self)
    View(MyCard.self)
    View(MyList.self)

    // View modifier functions
    Function("padding") { (all: Double) in
      return ViewModifierWrapper { view in
        view.padding(.all, all)
      }
    }

    Function("background") { (color: String) in
      return ViewModifierWrapper { view in
        view.background(Color(hex: color))
      }
    }

    Function("cornerRadius") { (radius: Double) in
      return ViewModifierWrapper { view in
        view.cornerRadius(radius)
      }
    }

    Function("shadow") { (radius: Double) in
      return ViewModifierWrapper { view in
        view.shadow(radius: radius)
      }
    }

    Function("opacity") { (opacity: Double) in
      return ViewModifierWrapper { view in
        view.opacity(opacity)
      }
    }

    Function("onTapGesture") { (callback: @escaping () -> Void) in
      return ViewModifierWrapper { view in
        view.onTapGesture {
          callback()
        }
      }
    }
  }
}

// Wrapper for SwiftUI view modifiers
struct ViewModifierWrapper {
  let modifier: (AnyView) -> AnyView
  
  init<V: View>(_ modifier: @escaping (AnyView) -> V) {
    self.modifier = { view in
      AnyView(modifier(view))
    }
  }
}
```

### ios/Components/MyButton.swift
```swift
import ExpoModulesCore
import SwiftUI

struct MyButton: ExpoSwiftUIView {
  @EnvironmentObject var props: MyButtonProps
  
  var body: some View {
    Button(action: {
      props.onButtonPress()
    }) {
      Text(props.text)
        .foregroundColor(Color(hex: props.textColor) ?? .primary)
        .padding()
    }
    .buttonStyle(getButtonStyle())
    .disabled(props.disabled)
  }
  
  private func getButtonStyle() -> some ButtonStyle {
    switch props.variant {
    case "bordered":
      return .bordered
    case "borderless":
      return .borderless
    case "borderedProminent":
      return .borderedProminent
    default:
      return .automatic
    }
  }
}

class MyButtonProps: ExpoSwiftUIViewProps {
  @Field var text: String = ""
  @Field var variant: String = "default"
  @Field var disabled: Bool = false
  @Field var backgroundColor: String?
  @Field var textColor: String?
  @Field var onButtonPress: () -> Void = {}
}
```

### ios/Components/MyCard.swift
```swift
import ExpoModulesCore
import SwiftUI

struct MyCard: ExpoSwiftUIView {
  @EnvironmentObject var props: MyCardProps
  
  var body: some View {
    VStack(alignment: .leading, spacing: 8) {
      Text(props.title)
        .font(.headline)
        .foregroundColor(.primary)
      
      if !props.subtitle.isEmpty {
        Text(props.subtitle)
          .font(.subheadline)
          .foregroundColor(.secondary)
      }
    }
    .padding()
    .background(Color(.systemBackground))
    .cornerRadius(12)
    .shadow(radius: CGFloat(props.elevation))
    .onTapGesture {
      props.onCardPress()
    }
  }
}

class MyCardProps: ExpoSwiftUIViewProps {
  @Field var title: String = ""
  @Field var subtitle: String = ""
  @Field var elevation: Int = 4
  @Field var onCardPress: () -> Void = {}
}
```

## 4. TypeScript Interface Layer

### src/types.ts
```typescript
export interface ModifierFunction {
  __expo_shared_object_id__: string;
}

export interface ViewEvent<EventName extends string, EventData> {
  [key in EventName]: (event: { nativeEvent: EventData }) => void;
}

export interface ButtonProps {
  text: string;
  variant?: 'default' | 'bordered' | 'borderless' | 'borderedProminent';
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  onPress?: () => void;
  modifiers?: ModifierFunction[];
}

export interface CardProps {
  title: string;
  subtitle?: string;
  elevation?: number;
  onPress?: () => void;
  modifiers?: ModifierFunction[];
}

export interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
}

export interface ListProps {
  items: ListItem[];
  onItemPress?: (item: ListItem) => void;
  onItemLongPress?: (item: ListItem) => void;
  modifiers?: ModifierFunction[];
}
```

### src/components/MyButton.tsx
```typescript
import { requireNativeView } from 'expo';
import React from 'react';
import type { ButtonProps, ViewEvent } from '../types';

type NativeButtonProps = Omit<ButtonProps, 'onPress'> & 
  ViewEvent<'onButtonPress', void>;

const NativeMyButton: React.ComponentType<NativeButtonProps> = 
  requireNativeView('MyNativeUI', 'MyButton');

export function MyButton(props: ButtonProps) {
  const { onPress, modifiers, ...restProps } = props;
  
  return (
    <NativeMyButton
      {...restProps}
      onButtonPress={onPress}
      modifiers={modifiers?.map(m => m.__expo_shared_object_id__)}
    />
  );
}
```

### src/components/MyCard.tsx
```typescript
import { requireNativeView } from 'expo';
import React from 'react';
import type { CardProps, ViewEvent } from '../types';

type NativeCardProps = Omit<CardProps, 'onPress'> & 
  ViewEvent<'onCardPress', void>;

const NativeMyCard: React.ComponentType<NativeCardProps> = 
  requireNativeView('MyNativeUI', 'MyCard');

export function MyCard(props: CardProps) {
  const { onPress, modifiers, ...restProps } = props;
  
  return (
    <NativeMyCard
      {...restProps}
      onCardPress={onPress}
      modifiers={modifiers?.map(m => m.__expo_shared_object_id__)}
    />
  );
}
```

### src/index.ts
```typescript
import { requireNativeModule, Platform } from 'expo';
import type { ModifierFunction } from './types';

const nativeModule = requireNativeModule('MyNativeUI');

// Export unified components (work on both platforms)
export { MyButton } from './components/MyButton';
export { MyCard } from './components/MyCard';
export { MyList } from './components/MyList';

// Export modifier functions
export const padding = (all: number): ModifierFunction => nativeModule.padding(all);
export const size = (width: number, height: number): ModifierFunction => 
  nativeModule.size(width, height);
export const background = (color: string): ModifierFunction => nativeModule.background(color);
export const border = (width: number, color: string): ModifierFunction => 
  nativeModule.border(width, color);
export const shadow = (elevation: number): ModifierFunction => nativeModule.shadow(elevation);
export const alpha = (alpha: number): ModifierFunction => nativeModule.alpha(alpha);
export const clickable = (callback: () => void): ModifierFunction => 
  nativeModule.clickable(callback);

// Export types
export type { ButtonProps, CardProps, ListProps, ModifierFunction } from './types';
```

## 5. Usage in Your App

Once your module is built and installed, you can use it in your Expo app:

```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  MyButton, 
  MyCard, 
  padding, 
  background, 
  shadow, 
  type ButtonProps 
} from 'my-native-ui-module';

export default function App() {
  return (
    <View style={styles.container}>
      <MyButton
        text="Hello from Native!"
        variant="borderedProminent"
        onPress={() => console.log('Button pressed!')}
        modifiers={[
          padding(16),
          background('#007AFF'),
          shadow(4)
        ]}
      />
      
      <MyCard
        title="Native Card"
        subtitle="Built with Compose/SwiftUI"
        elevation={8}
        onPress={() => console.log('Card pressed!')}
        modifiers={[
          padding(12),
          background('#F5F5F5')
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
```

## 7. Advanced Features

### Custom Animations
- For Android: Use Compose animations with `AnimatedVisibility`, `animateContentSize`, etc.
- For iOS: Use SwiftUI animations with `.animation()`, `withAnimation`, etc.

### State Management
- Implement state sharing between native and JS using Expo Modules shared objects
- Use `SharedObject` for complex state management

### Performance Optimization
- Use `LazyColumn`/`LazyRow` for Android and `LazyVStack`/`LazyHStack` for iOS for large lists
- Implement proper view recycling and memory management

## 8. Testing

Create unit tests for your components:

### Android Testing
```kotlin
@RunWith(AndroidJUnit4::class)
class MyButtonTest {
  @Test
  fun testButtonRender() {
    // Test your Compose components
  }
}
```

### iOS Testing
```swift
import XCTest
@testable import MyNativeUIModule

class MyButtonTests: XCTestCase {
  func testButtonRender() {
    // Test your SwiftUI components
  }
}
```

## 9. Publishing

1. Update version in `package.json`
2. Build the module: `npm run build`
3. Publish to npm: `npm publish`

This guide provides a solid foundation for creating native UI modules with Jetpack Compose and SwiftUI in Expo. Customize the components and styling to match your app's design system and requirements.