import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { SONNER_CONFIG, sonnerConfig, SonnerConfig } from './sonner.config';

export function provideSonner(
  config: Partial<SonnerConfig> = {}
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: SONNER_CONFIG,
      useValue: sonnerConfig(config),
    },
  ]);
}
