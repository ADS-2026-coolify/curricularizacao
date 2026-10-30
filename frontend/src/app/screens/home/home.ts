import { Component } from '@angular/core';
import { HeroSection } from '../../components/hero-section/hero-section';
import { CallAction } from '../../components/call-action/call-action';
import { WrapperContent } from '../../components/wrapper-content/wrapper-content';
import { TittleSection } from '../../components/tittle-section/tittle-section';
import { TitleMain } from '../../components/title-main/title-main';
import { FeatureCard } from '../../components/feature-card/feature-card';
import { SprintCard } from '../../components/sprint-card/sprint-card';
import { ScrumCard } from '../../components/scrum-card/scrum-card';
import { Footer } from '../../components/footer/footer';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [HeroSection,CallAction, WrapperContent, TittleSection,TitleMain, FeatureCard, SprintCard, ScrumCard, Footer, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
