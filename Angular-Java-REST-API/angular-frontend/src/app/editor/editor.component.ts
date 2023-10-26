import { AfterViewInit, OnDestroy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import type { Editor } from '@ckeditor/ckeditor5-core';
import type { AnnotationsUIs } from '@ckeditor/ckeditor5-comments';
import * as ClassicEditorBuild from '../../../vendor/ckeditor5/build/classic-editor-with-real-time-collaboration.js';
import { CloudServicesConfig } from './common-interfaces';

const { ClassicEditorWithRealTimeCollaboration, CKBox } = ClassicEditorBuild;


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass']
})
export class EditorComponent implements AfterViewInit, OnDestroy {
	@Input() public configuration!: CloudServicesConfig;
	@Input() public channelId!: string;
	@Output() public ready = new EventEmitter<Editor>();
	@ViewChild( 'sidebar', { static: true } ) private sidebarContainer?: ElementRef<HTMLDivElement>;
	@ViewChild( 'presenceList', { static: true } ) private presenceListContainer?: ElementRef<HTMLDivElement>;



	public Editor = ClassicEditorWithRealTimeCollaboration;
	public editor?: Editor;

	//public data = this.getInitialData();

	public data:any='';

	public get editorConfig() {
		return {
			cloudServices: {
				tokenUrl: this.configuration.tokenUrl,
				webSocketUrl: this.configuration.webSocketUrl
			},
			collaboration: {
				channelId: this.channelId
			},
			ckbox: {
				tokenUrl: this.configuration.ckboxTokenUrl || this.configuration.tokenUrl
			},
			sidebar: {
				container: this.sidebar
			},
			presenceList: {
				container: this.presenceList
			},
			license:'TXVTY3FqcVJ0aXdYbzdhQnFobG9uWUJtMlRnK1kvWWp2S1g4ZXNkZzRTUi9jaWMxaHRoL3FnNkprcHJhLU1qQXlNekE0TWpRPQ==',
			autosave: {
				// The minimum amount of time the Autosave plugin is waiting after the last data change.
				waitingTime: 5000,
				save: editor => this.saveData( editor.getData() )
			},
		};
	}

	// Note that Angular refs can be used once the view is initialized so we need to create
	// these containers and use in the above editor configuration to workaround this problem.
	private sidebar = document.createElement( 'div' );
	private presenceList = document.createElement( 'div' );

	private boundRefreshDisplayMode = this.refreshDisplayMode.bind( this );
	private boundCheckPendingActions = this.checkPendingActions.bind( this );

	public ngAfterViewInit(): void {
		window.CKBox = CKBox;

		if ( !this.sidebarContainer || !this.presenceListContainer ) {
			throw new Error( 'Div containers for sidebar or presence list were not found' );
		}

		this.sidebarContainer.nativeElement.appendChild( this.sidebar );
		this.presenceListContainer.nativeElement.appendChild( this.presenceList );
	}

	public ngOnDestroy(): void {
		window.removeEventListener( 'resize', this.boundRefreshDisplayMode );
		window.removeEventListener( 'beforeunload', this.boundCheckPendingActions );
	}

	public onReady( editor: Editor ): void {
		this.editor = editor;
		this.ready.emit( editor );

		


		// Prevent closing the tab when any action is pending.
		window.addEventListener( 'beforeunload', this.boundCheckPendingActions );

		// Switch between inline and sidebar annotations according to the window size.
		window.addEventListener( 'resize', this.boundRefreshDisplayMode );
		this.refreshDisplayMode();
	}

	private checkPendingActions( domEvt ): void {
		if ( this.editor.plugins.get( 'PendingActions' ).hasAny ) {
			domEvt.preventDefault();
			domEvt.returnValue = true;
		}
	}

	private refreshDisplayMode(): void {
		const annotationsUIs = this.editor.plugins.get( 'AnnotationsUIs' ) as AnnotationsUIs;
		const sidebarElement = this.sidebarContainer.nativeElement;

		if ( window.innerWidth < 1070 ) {
			sidebarElement.classList.remove( 'narrow' );
			sidebarElement.classList.add( 'hidden' );
			annotationsUIs.switchTo( 'inline' );
		}
		else if ( window.innerWidth < 1300 ) {
			sidebarElement.classList.remove( 'hidden' );
			sidebarElement.classList.add( 'narrow' );
			annotationsUIs.switchTo( 'narrowSidebar' );
		}
		else {
			sidebarElement.classList.remove( 'hidden', 'narrow' );
			annotationsUIs.switchTo( 'wideSidebar' );
		}
	}


	public saveData( data ) {
		// Here you can save the data to the backend and return a promise to that action.
	}

}

